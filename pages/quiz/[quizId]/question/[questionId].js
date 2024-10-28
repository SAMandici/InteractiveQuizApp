import { useRouter } from "next/router";
import { useState } from "react";
import quizzesData from "../../../../data/quizzes.json";

const Question = ({ quiz, question }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false); // Track submission status

  if (!question) {
    return <p>Missing question</p>;
  }

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

  const isLastQuestion = parseInt(question.id) === quiz.questions.length;

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

// Fetching data for the page
export async function getServerSideProps(context) {
  const { quizId, questionId } = context.params;

  const quiz = quizzesData.find((q) => q.id === quizId);
  const question = quiz?.questions.find((q) => q.id === questionId);

  // Pass data to the page via props
  return {
    props: {
      quiz: quiz || null, // Pass null if the quiz isn't found
      question: question || null, // Pass null if the question isn't found
    },
  };
}

export default Question;
