// pages/categories.js
import { useEffect, useState } from "react";
import Link from "next/link";

const Categories = () => {
  // State for categories, loading status, and errors
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hook to fetch data from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch data from the API
        const response = await fetch("/api/categories");

        // Check if the response is ok
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Convert the response to JSON
        const data = await response.json();
        setCategories(data); // Set the categories
      } catch (err) {
        setError(err); // Set the error
      } finally {
        setLoading(false); // Indicate that loading has finished
      }
    };

    fetchCategories(); // Call the fetch function
  }, []); // Empty dependencies to run only once

  // Display a message for loading, an error message or no categories available
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (categories.length === 0) return <p>No categories available.</p>;

  return (
    <div>
      <h1>Available Categories</h1>
      <ul>
        {/* Map through categories and create links for each */}
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/quiz/${category.id}`}>
              {category.title} {/* Category title */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
