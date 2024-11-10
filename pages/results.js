import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddNewQuestion from "../components/AddNewQuestion";

const Results = () => {
  const router = useRouter();
  const { score, category } = router.query;
  const [currentQuizzes, setCurrentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedQuizzes = localStorage.getItem("quizzes");
      const quizzesArray = storedQuizzes ? JSON.parse(storedQuizzes) : [];
      if (Array.isArray(quizzesArray)) {
        setCurrentQuizzes(quizzesArray);
      } else {
        console.warn("Quizzes data is not an array", quizzesArray);
      }
    } catch (error) {
      console.error("Failed to load quizzes from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleQuestionAdded = (newQuestion) => {
    const updatedQuizzes = [...currentQuizzes, newQuestion];
    setCurrentQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Results for the category: {category}</h1>
      <p>Score: {score}</p>
      <Link href="/categories">
        <button>Back to categories</button>
      </Link>

      <h2>Add a New Question</h2>
      <AddNewQuestion
        category={category}
        onQuestionAdded={handleQuestionAdded}
      />
    </div>
  );
};

export default Results;
