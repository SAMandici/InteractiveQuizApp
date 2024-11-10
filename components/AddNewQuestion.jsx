import { useState, useEffect } from "react";

const AddQuestionForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories"); // Fetch the categories
        const data = await response.json();
        if (response.ok) {
          setCategories(data); // Assuming the API returns a list of categories
        } else {
          setError("Nu s-au putut încărca categoriile");
        }
      } catch (err) {
        setError("A apărut o eroare la încărcarea categoriilor");
      }
    };

    fetchCategories();
  }, []);

  const handleAddQuestion = async (e) => {
    e.preventDefault();

    // Validate that the required fields are filled
    if (
      !selectedCategory ||
      !newQuestion ||
      !newOptions.every((opt) => opt) ||
      !correctAnswer
    ) {
      setError("Te rog completează toate câmpurile.");
      return;
    }

    setError(null); // Clear any previous error

    const newQuestionData = {
      categoryId: selectedCategory,
      questionText: newQuestion,
      options: {
        A: newOptions[0],
        B: newOptions[1],
        C: newOptions[2],
        D: newOptions[3],
      },
      correctAnswer: correctAnswer,
    };

    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestionData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message); // Success response from the API
        setNewQuestion(""); // Clear question input
        setNewOptions(["", "", "", ""]); // Clear options
        setCorrectAnswer(""); // Clear correct answer
      } else {
        setError(data.error || "A apărut o eroare la adăugarea întrebării");
      }
    } catch (err) {
      console.error(err);
      setError("A apărut o eroare la trimiterea întrebării");
    }
  };

  return (
    <div className="form-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* Select dropdown for categories */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)} // Update selectedCategory on change
      >
        <option value="" disabled>
          Selectează o categorie
        </option>
        {categories.length === 0 ? (
          <option value="" disabled>
            Nu există categorii
          </option>
        ) : (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title} {/* Display category title */}
            </option>
          ))
        )}
      </select>

      <input
        type="text"
        placeholder="Noua întrebare"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />

      {newOptions.map((option, index) => (
        <div key={index} className="option-container">
          <input
            type="text"
            placeholder={`Opțiunea ${index + 1}`}
            value={option}
            onChange={(e) => {
              const options = [...newOptions];
              options[index] = e.target.value;
              setNewOptions(options);
            }}
          />
        </div>
      ))}

      <input
        type="text"
        placeholder="Răspunsul corect"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />

      <button className="submit-button" onClick={handleAddQuestion}>
        Adaugă
      </button>

      <style jsx>{`
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 400px;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .option-container {
          display: flex;
          gap: 10px;
        }
        input,
        select {
          padding: 10px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #ccc;
          background-color: #fafafa;
          color: black; /* Change text color to black */
        }
        input:focus,
        select:focus {
          outline: none;
          border-color: #4caf50;
          background-color: #f1f1f1;
        }

        select {
          background-color: #d3d3d3; /* Set gray background for select */
        }

        .submit-button {
          width: 50%;
          align-self: center;
          padding: 10px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .submit-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default AddQuestionForm;
