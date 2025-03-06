import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=react"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data.items || []); // Set books, jika tidak ada item, set sebagai array kosong
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>BookVerse - React Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 shadow-sm">
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/128x192"
              }
              alt={book.volumeInfo.title}
              className="mb-4"
            />
            <h2 className="text-xl font-bold">{book.volumeInfo.title}</h2>
            <p className="text-gray-700">
              Penulis:{" "}
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Tidak diketahui"}
            </p>
            <Link
              to={`/books/${book.id}`}
              className="text-blue-500 hover:underline"
            >
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
