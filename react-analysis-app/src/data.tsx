export interface Movie {
  id: string; // OMDb používá imdbID
  title: string;
  genre: string;
  rating: string;
  description: string;
  poster: string;
}

export const API_KEY = '3f95d70a';
export const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
