// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Bun venit Exploratori!</h1>
      <p>Alege o categorie pentru a începe quiz-ul:</p>
      <ul>
        <li>
          <Link href="/categories">Vezi Categorii</Link>
        </li>
      </ul>
    </div>
  );
}
