import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import MovieDetail from './pages/MovieDetail';

const API_KEY = '3f95d70a';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export default function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cinema-favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('cinema-favorites', JSON.stringify(newFavs));
  };

  return (
    <Router>
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 p-5 flex justify-between">
        <Link to="/" className="text-xl font-black">
          CINEMA<span className="text-blue-600">HUB</span>
        </Link>
        <div className="flex gap-5 text-xs font-bold uppercase">
          <Link to="/">Katalog</Link>
          <Link to="/profile">Kabinet ({favorites.length})</Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Catalog favorites={favorites} toggleFavorite={toggleFavorite} BASE_URL={BASE_URL} />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile favorites={favorites} toggleFavorite={toggleFavorite} BASE_URL={BASE_URL} />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              BASE_URL={BASE_URL}
            />
          }
        />
      </Routes>
    </Router>
  );
}
