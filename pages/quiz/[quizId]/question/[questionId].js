// pages/quiz/[quizId]/question/[questionId].js
import { useRouter } from "next/router";
import { useState } from "react";
import quizzesData from "../../../../data/quizzes.json";

const Question = () => {
  const router = useRouter();
  const { quizId, questionId } = router.query;

  const quiz = quizzesData.find((q) => q.id === quizId);
  const question = quiz?.questions.find((q) => q.id === questionId);

  const [selectedOption, setSelectedOption] = useState(null);

  if (!question) {
    return <p>Întrebarea nu a fost găsită.</p>;
  }

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const nextQuestionId = parseInt(questionId) + 1;
    if (nextQuestionId <= quiz.questions.length) {
      router.push(`/quiz/${quizId}/question/${nextQuestionId}`);
    } else {
      // Redirect to results page or show completion message
      router.push(`/quiz/${quizId}/results`); // Assuming you have a results page
    }
  };

  return (
    <div>
      <h1>Întrebare {question.id}</h1>
      <p>{question.question}</p>
      <form>
        {question.options.map((option) => (
          <div key={option}>
            <label>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          </div>
        ))}
      </form>
      <button onClick={handleNextQuestion} disabled={!selectedOption}>
        Următoarea întrebare
      </button>
    </div>
  );
};

export default Question;
