import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetail() {
  const { id } = useParams(); // Ambil parameter id dari URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        if (!data.volumeInfo) {
          throw new Error("Book not found");
        }
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{book.volumeInfo.title}</h1>
      <img
        src={
          book.volumeInfo.imageLinks?.thumbnail ||
          "https://via.placeholder.com/128x192"
        }
        alt={book.volumeInfo.title}
        className="mb-4"
      />
      <p>
        <strong>Penulis:</strong>{" "}
        {book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "Tidak diketahui"}
      </p>
      <p>
        <strong>Deskripsi:</strong>{" "}
        {book.volumeInfo.description || "Tidak ada deskripsi untuk buku ini"}
      </p>
    </div>
  );
}

export default BookDetail;
