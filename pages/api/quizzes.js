import fs from "fs";
import path from "path";

// File path to the quizzes data (update to match your actual file name)
const filePath = path.join(process.cwd(), "data/quizzes.json");

// Helper function to generate a new unique ID for questions
const generateNewQuestionId = (questions) => {
  const lastQuestion = questions[questions.length - 1];
  return (parseInt(lastQuestion.id) + 1).toString(); // Increment the last question ID
};

// API route handler for managing quiz data
export default function apiHandler(req, res) {
  let quizzesData;
  try {
    // Read the quizzes data from the JSON file
    quizzesData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    return res.status(500).json({ error: "Error reading quizzes data file." });
  }

  // Handling POST requests to add a new question
  if (req.method === "POST") {
    const { categoryId, questionText, options, correctAnswer } = req.body;

    // Check if all required data is present
    if (!categoryId || !questionText || !options || !correctAnswer) {
      return res
        .status(400)
        .json({ error: "Missing required data for the new question." });
    }

    // Find the category by categoryId
    const category = quizzesData.find((cat) => cat.id === categoryId);

    if (!category) {
      return res.status(400).json({ error: "Category not found." });
    }

    // Generate a new ID for the question
    const newQuestionId = generateNewQuestionId(category.questions);

    // Create the new question object
    const newQuestion = {
      id: newQuestionId,
      question: questionText,
      options: options,
      correctAnswer: correctAnswer,
      submitted: false,
    };

    // Add the new question to the appropriate category
    category.questions.push(newQuestion);

    // Save the updated quizzes data to the file
    try {
      fs.writeFileSync(filePath, JSON.stringify(quizzesData, null, 2));
      return res.status(200).json({ message: "Question added successfully!" });
    } catch (error) {
      return res.status(500).json({ error: "Error saving the new question." });
    }
  }
  // Handling GET requests to retrieve all quizzes data
  else {
    return res.status(200).json(quizzesData);
  }
}
