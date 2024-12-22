import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Book_UpDateForm(props) {
  const [state, setState] = useState({
    booktitle: "",
    author: "",
    formate: "",
    Topic: "",
    PubYear: 1990,
  });

  const [loading, setLoading] = useState(true); // State for loading data
  let url = "http://localhost:5000/";
  let params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    axios
      .get(url + "getbook/" + params.id)
      .then((res) => {
        console.log("Data received for update:", res.data);
        setState(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching the book details:", err);
        alert("Failed to fetch book details. Try again later.");
        setLoading(false);
      });
  }, [params.id]);

  const OnSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if any field is empty
    if (!state.booktitle || !state.author || !state.Topic || !state.formate) {
      alert("All fields must be filled out before updating.");
      return;
    }

    const bookdata = {
      booktitle: state.booktitle,
      PubYear: state.PubYear,
      author: state.author,
      Topic: state.Topic,
      formate: state.formate,
    };

    // Update book data
    axios
      .post(url + "updatebook/" + params.id, bookdata)
      .then((res) => {
        console.log("Book updated successfully:", res.data);
        alert(`Book "${state.booktitle}" has been updated successfully!`);
      })
      .catch((err) => {
        console.error("Error updating the book:", err);
        alert("Failed to update the book. Please try again.");
      });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Update Book</h3>
      {loading ? (
        <h4>Loading book details...</h4>
      ) : (
        <form onSubmit={OnSubmit} method="POST">
          <div className="form-group">
            <label>Book Title: </label>
            <input
              className="form-control"
              type="text"
              name="booktitle"
              value={state.booktitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Book Authors: </label>
            <input
              className="form-control"
              name="author"
              value={state.author}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Pick Book Topic:{" "}
              <select
                className="form-control"
                name="Topic"
                value={state.Topic}
                onChange={handleChange}
              >
                <option value="">-- Select Topic --</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Programming">Programming</option>
                <option value="Data Science">Data Science</option>
                <option value="AI">AI</option>
                <option value="Engineering">Engineering</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>Format: </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="formate"
                value="Hard Copy"
                checked={state.formate === "Hard Copy"}
                onChange={handleChange}
              />
              <label className="form-check-label">Hard Copy</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="formate"
                value="Electronic Copy"
                checked={state.formate === "Electronic Copy"}
                onChange={handleChange}
              />
              <label className="form-check-label">Electronic Copy</label>
            </div>
          </div>

          <div className="form-group">
            <label>
              Publication Year (between 1980 and 2025):
              <input
                type="range"
                name="PubYear"
                min="1980"
                max="2025"
                value={state.PubYear}
                onChange={handleChange}
              />
              <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                {state.PubYear}
              </span>
            </label>
          </div>

          <center>
            <div className="form-group">
              <input
                type="submit"
                value="Update"
                className="btn btn-primary"
              />
            </div>
          </center>
        </form>
      )}
    </div>
  );
}

export default Book_UpDateForm;
