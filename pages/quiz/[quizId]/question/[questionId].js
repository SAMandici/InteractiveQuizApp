// pages/quiz/[quizId]/question/[questionId].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Question = () => {
  const router = useRouter();
  const { quizId, questionId } = router.query; // Get quizId and questionId from the URL
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/api/quizzes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const quizzesData = await response.json();
        const foundQuiz = quizzesData.find((q) => q.id === quizId);
        setQuiz(foundQuiz);
      } catch (err) {
        setError(err); // Set error if fetching fails
      } finally {
        setLoading(false); // Indicate that loading has finished
      }
    };

    if (quizId) {
      fetchQuizData();
    }
  }, [quizId]);

  // Display loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  const question = quiz.questions.find((q) => q.id === questionId);

  // Check if this is the last question
  const isLastQuestion =
    question && parseInt(question.id) === quiz.questions.length;

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setFeedback(""); // Reset feedback on new selection
  };

  const handleSubmit = () => {
    // Verify the right answer
    if (selectedOption === question.correctAnswer) {
      setFeedback("Correct!");
      setScore((prevScore) => prevScore + 1); // Increment score
    } else {
      setFeedback(`Wrong! The answer is: ${question.correctAnswer}`);
    }
    setSubmitted(true); // Mark as submitted
  };

  const handleNext = () => {
    const nextQuestionId = parseInt(question.id) + 1;
    if (nextQuestionId <= quiz.questions.length) {
      // Reset for the next question
      setFeedback("");
      setSelectedOption(null);
      setSubmitted(false);
      router.push(`/quiz/${quiz.id}/question/${nextQuestionId}`);
    } else {
      // Navigate to results with score and category
      router.push(`/results?score=${score}&category=${quiz.title}`);
    }
  };

  return (
    <div>
      <h1>Question {question.id}</h1>
      <p>{question.question}</p>
      <div className="button-group">
        {question.options.map((option) => (
          <button
            key={option}
            className={`option-button ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => handleOptionChange(option)}
            disabled={submitted} // Disable options after submission
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && <p>{feedback}</p>} {/* Show feedback after submission */}
      <button onClick={handleSubmit} disabled={!selectedOption}>
        Submit
      </button>
      {submitted && (
        <button onClick={handleNext}>
          {isLastQuestion ? "Check the Results" : "Next Question"}
        </button>
      )}
    </div>
  );
};

export default Question;
