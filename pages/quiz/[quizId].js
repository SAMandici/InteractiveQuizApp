// pages/quiz/[quizId].js
import { useRouter } from "next/router";
import Link from "next/link";
import quizzesData from "../../data/quizzes.json";

const Quiz = () => {
  const router = useRouter();
  const { quizId } = router.query;
  const quiz = quizzesData.find((q) => q.id === quizId);

  if (!quiz) {
    return <p>Quiz-ul nu a fost găsit.</p>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>Întrebări disponibile: {quiz.questions.length}</p>
      <Link href={`/quiz/${quizId}/question/1`}>Începe Quiz-ul</Link>
    </div>
  );
};

export default Quiz;
