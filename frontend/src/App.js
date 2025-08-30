
// COMMENTS ARE FOR CHANGES REQUIRED TO USE TF-IDF RECOMMENDATION SYSTEM, THIS IS NOT MANDATORY AS THE BELOW SYSTEM WORKS ON ONEHOTENCODER SYSTEM 
// Change the code of this file with the App.js file in the main branch to use the TF-IDF Movie Recommendation system 

import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  
  const fetchRecommendations = async () => {
    if (!title) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/recommend_by_title?title=${title}`  //Fetches data from the Backend with specific function and it's Query
      );
      const data = await response.json();
      console.log("Backend returned:", data);
      setRecommendations(data.Recommended_movies || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const fetchByGenre = async () => {
    if (!genre) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/recommend_by_genre?genre=${genre}`
      );
      const data = await response.json();
      console.log("Genre response:", data);
      setRecommendations(data.Top_movies || []);
    } catch (error) {
      console.error("Error fetching by genre:", error);
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
          Recommend by Title
        </button>
      </div>

      <div className="input-container">
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter a genre"
          className="movie-input"
        />
        <button onClick={fetchByGenre} className="recommend-btn">
          Recommend by Genre
        </button>
      </div>

      <h3 className="subtitle">Top Recommendations:</h3>
      <div className="movie-grid">
        {recommendations.length > 0 ? (
          recommendations.map((movie, index) => (            // As the Recommended Movies is in the form of array, mapping can be done to traverse the top 5 movies
          <div key={index} className="movie-card">
            <h4 className="movie-title">{movie.Series_Title}</h4>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Star:</strong> {movie.Star1}</p>
            <p><strong>IMDB Rating:</strong>{movie.IMDB_Rating}</p>
          </div>
          ))
        ) : (
          <p>No recommendations found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
