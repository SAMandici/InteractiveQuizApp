// pages/api/categories.js
import quizzes from "../../data/quizzes.json";

export default function handler(req, res) {
  res.status(200).json(quizzes);
}
