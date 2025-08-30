## This is a Movie Recommendation System built with:

Backend (FastAPI) → Serves recommendations using saved similarity matrices and encoded CSVs.

Frontend (React) → Provides a simple UI to search movies and display the top recommendations.

Modeling Approach → Uses TF-IDF and One-Hot Encoding to compute similarity scores.

Artifacts → Similarity matrices, processed CSVs, and model notebook (.ipynb) are saved inside the repo.

```
Movie-Recommendation-System/
│
├── backend/                        # FastAPI backend
│   ├── app.py                      # FastAPI app
│   ├── movies.csv                  # Encoded movies dataset (OneHotEncoding)
│   ├── similarity_matrix.npy       # Saved similarity matrix (OneHotEncoding)
│   ├── movies_1.csv                # Encoded movies dataset (TFIDF)
│   ├── similarity_matrix_1.npy     # Saved similarity matrix (TFIDF)
│   └── model.ipynb                 # Jupyter Notebook (model training)
│
├── frontend/                       # React frontend
│   ├── src/                        # React components
│   ├── public/                     # Static files
│   └── package.json
|
├── imdb_top_1000.csv               # Original Dataset (from Kaggle)
├── README.md
└── .gitignore
```

# Backend Setup (FastAPI)
## 1. Navigate to backend folder
```
cd backend
```
## 2. Make sure to install required dependencies
```
pip install fastapi uvicorn pandas numpy scikit-learn
```
## 3. Run FastAPI server
```
uvicorn app:app --reload
```
The backend will now be running at the given address: http://127.0.0.1:8000

# Frontend Setup (React)
## 1. Navigate to frontend folder
```
cd frontend
```
## 2. Make sure to install required dependencies
```
npm install
```
## 3. Start the React App
```
npm start
```
This will redirect you to the the link where frontend is running: http://localhost:3000

# How It Works

Movies are vectorized using TF-IDF (for text fields like genres/overview) and One-Hot Encoding (for categorical features like director, cast, etc.).

A cosine similarity matrices are computed and saved (similarity_matrix.npy and similarity_matrix_1.npy).

When a user searches for a movie, the backend fetches the most similar movies and returns details (Title, Director, Stars, IMDB Rating).

The React frontend displays the Top N recommended movies.

# Notes

Model Notebook (Model.ipynb) contains the code used to preprocess the data, build TF-IDF + one-hot encodings, and generate similarity matrices.

Backend loads pre-computed matrices (similarity_matrix.npy or similarity_matrix_1.npy) and CSVs to avoid re-training.

If you want to re-train or modify feature engineering, update the notebook and regenerate the files.

**Important:** 
The Recommendation System is by default running on the OneHotEncoded dataset (movies.csv) and it's respective similarity matrix (similarity_matrix.npy)

If you want to use the TF-IDF dataset (movies_1.csv) and it's respective similarity matrix (similarity_matrix_1.npy), please ensure to make some changes in the *app.py* (Backend Folder) and *App.js* (frontend/src) folder.

Comments have been added for the required changes.
