export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
  Plot?: string;
  imdbRating?: string;
  Runtime?: string;
  Genre?: string;
}

export const API_KEY = '3f95d70a';
export const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
