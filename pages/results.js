// pages/results.js
import Link from "next/link";
import { useRouter } from "next/router";

const Results = () => {
  const router = useRouter();
  const { score, category } = router.query; // Get score and category from the query

  return (
    <div>
      <h1>Results for the category: {category}</h1>
      <p>Score: {score}</p>
      <Link href="/categories">
        <button>Back to categories</button>
      </Link>
    </div>
  );
};

export default Results;
