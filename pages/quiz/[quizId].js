// pages/quiz/[quizId].js
import { useRouter } from "next/router";
import Link from "next/link";
import quizzesData from "../../data/quizzes.json";

const Quiz = () => {
  const router = useRouter();
  const { quizId } = router.query;

  // Ensure quizId is defined and matches the expected type
  const quiz = quizzesData.find((q) => q.id === quizId);

  if (!quiz) {
    return <p>The quiz was not found.</p>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>Available questions: {quiz.questions.length}</p>{" "}
      <Link href={`/quiz/${quizId}/question/1`}>Start Quiz</Link>{" "}
    </div>
  );
};

export default Quiz;
