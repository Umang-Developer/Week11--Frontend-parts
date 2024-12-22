import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DisplayData from './DisplayData';

export default function DeleteBook() {
    const [books, setBooks] = useState([]);
    const { id } = useParams(); // Destructure id from params
    const navigate = useNavigate();

    useEffect(() => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        
        if (!confirmDelete) {
            alert("Book deletion canceled.");
            navigate("/"); // Redirect back
            return;
        }

        // Delete the book
        axios.post(`http://localhost:5000/deleteBook/${id}`)
            .then(() => {
                alert("Book deleted successfully!"); // Success Alert

                // Fetch updated book list
                axios.get("http://localhost:5000/allbooks")
                    .then((res) => {
                        setBooks(res.data);
                    })
                    .catch((err) => {
                        console.error("Error fetching books:", err);
                        alert("Failed to fetch updated book list.");
                    });
            })
            .catch((err) => {
                console.error("Error deleting the book:", err);
                alert("Failed to delete the book. Please try again.");
                navigate("/"); // Redirect back
            });
    }, [id, navigate]);

    return (
        <div>
            <h3>Updated Book List</h3>
            {/* Display the updated book list */}
            {books.length > 0 ? (
                <DisplayData books={books} />
            ) : (
                <h4>No books available after deletion.</h4>
            )}
        </div>
    );
}
