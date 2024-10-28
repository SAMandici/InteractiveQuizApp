// pages/categories.js
import Link from "next/link";
import quizzesData from "../data/quizzes.json";

const Categories = () => {
  const categories = quizzesData; // Directly use the quizzes data

  return (
    <div>
      <h1>Categorii Disponibile</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/quiz/${category.id}`}>{category.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
