import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

interface Props {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  BASE_URL: string;
}

const Profile: React.FC<Props> = ({ favorites, toggleFavorite, BASE_URL }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      if (favorites.length === 0) {
        setFavoriteMovies([]);
        return;
      }
      setLoading(true);
      try {
        const requests = favorites.map((id) =>
          fetch(`${BASE_URL}&i=${id}`).then((res) => res.json())
        );
        const results = await Promise.all(requests);
        setFavoriteMovies(
          results.map((m: any) => ({
            id: m.imdbID,
            title: m.Title,
            genre: m.Year,
            poster:
              m.Poster !== 'N/A' ? m.Poster : 'https://via.placeholder.com/400x600?text=No+Poster',
          }))
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [favorites, BASE_URL]);

  return (
    <div className="pt-32 px-8 pb-20 max-w-7xl mx-auto">
      <h2 className="text-4xl font-black mb-10 italic border-l-4 border-blue-600 pl-4">
        My Cabinet
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/50 rounded-3xl border border-gray-800">
          <p className="text-gray-500 mb-4">No movies saved yet.</p>
          <Link to="/" className="text-blue-500 font-bold hover:underline">
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {favoriteMovies.map((m: any) => (
            <MovieCard key={m.id} movie={m} isFavorite={true} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
