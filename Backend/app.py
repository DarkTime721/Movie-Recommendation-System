from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

df = pd.read_csv("movies.csv")
cosine_sim = np.load("similarity_matrix.npy")

def recommend_by_title(title, top_rec = 5):
    if title not in df['Series_Title'].values:
        return f"Movie '{title}' not found in database."
    
    index = df[df['Series_Title'] == title].index[0]
    sim_score = list(enumerate(cosine_sim[index]))
    sim_score = sorted(sim_score, key=lambda x: x[1], reverse= True)

    top_recommendations = [i for i, score in sim_score[1:top_rec+1]]

    return df.iloc[top_recommendations][['Series_Title', 'Director', 'Star1', 'IMDB_Rating']].to_dict(orient='records')

def recommend_by_genre(genre, top_rec = 5):
    genre_col = f"genre_{genre}"
    if genre_col not in df.columns:
        return f"Genre '{genre}' not found in database"
    
    genre_movies = df[df[genre_col] == 1]
    if genre_movies.empty:
        return f"No movies found for genre '{genre}"
    
    genre_movies = genre_movies.copy()
    genre_movies['score'] = (genre_movies['IMDB_Rating']*0.7) + (genre_movies["No_of_Votes"]*0.3) # Score based more towards IMDB rating rather than no of votes (people) 
    top_movies_rec = genre_movies.sort_values('score', ascending=False).head(top_rec)

    return top_movies_rec[['Series_Title', 'IMDB_Rating', 'Director', 'Star1']].to_dict(orient="records")

@app.get("/recommend_by_title")
def get_recommend_by_title(title: str = Query()):
    movies = recommend_by_title(title)
    return {"Recommended_movies": movies}

@app.get("/recommend_by_genre")
def get_recommend_by_genre(genre: str = Query()):
    movies = recommend_by_genre(genre)
    return {f"Top_movies": movies}


