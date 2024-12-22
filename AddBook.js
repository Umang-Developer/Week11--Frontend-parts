import React, { useState } from "react";
import axios from "axios";

export default function Book_Form() {
  let url = "http://localhost:5000/";
  const [state, setState] = useState({
    booktitle: "",
    author: "",
    formate: "",
    Topic: "",
    PubYear: 1990,
  });

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (
      !state.booktitle ||
      !state.author ||
      !state.Topic ||
      !state.formate ||
      !state.PubYear
    ) {
      setErrors("All fields are required. Please fill out the entire form.");
      return false;
    }
    setErrors("");
    return true;
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookdata = {
      booktitle: state.booktitle,
      PubYear: state.PubYear,
      author: state.author,
      Topic: state.Topic,
      formate: state.formate,
    };

    // POST request using axios
    axios
      .post(url + "addbooks", bookdata)
      .then((res) => {
        console.log("Book added successfully:", res.data);
        alert("Book added successfully!");
        // Reset the form
        setState({
          booktitle: "",
          author: "",
          formate: "",
          Topic: "",
          PubYear: 1990,
        });
      })
      .catch((err) => {
        console.error("Error adding the book:", err);
        alert("Failed to add the book. Try again.");
      });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Add Book</h3>
      {errors && <div style={{ color: "red" }}>{errors}</div>}
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
          <label>Formate: </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="formate"
              value="Hard Copy"
              checked={state.formate === "Hard Copy"}
              onChange={handleChange}
            />
            <label className="form-check-label"> Hard Copy </label>
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
            <label className="form-check-label"> Electronic Copy</label>
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
        <div className="form-group">
          <center>
            <input
              type="submit"
              value="Add this book"
              className="btn btn-primary"
            />
          </center>
        </div>
      </form>
    </div>
  );
}
