import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    if (!title) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/recommend_by_title?title=${title}`
      );
      const data = await response.json();
      setRecommendations(data.recommended_movies);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div className="app">
      <h2 className="title">Movie Recommendation System</h2>

      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a movie title"
          className="movie-input"
        />
        <button onClick={fetchRecommendations} className="recommend-btn">
          Recommend
        </button>
      </div>

      <h3 className="subtitle">Top Recommendations:</h3>
      <div className="movie-grid">
        {recommendations.map((movie, index) => (
          <div key={index} className="movie-card">
            <h4 className="movie-title">{movie.Series_Title}</h4>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Star:</strong> {movie.Star1}</p>
            <p><strong>IMDB Rating:</strong>{movie.IMDB_Rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;