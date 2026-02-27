import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Props {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  BASE_URL: string;
}

const MovieDetail: React.FC<Props> = ({ favorites, toggleFavorite, BASE_URL }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const res = await fetch(`${BASE_URL}&i=${id}&plot=full`);
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id, BASE_URL]);

  if (loading)
    return (
      <div className="pt-40 text-center text-gray-500 uppercase tracking-widest">Loading...</div>
    );
  if (!movie) return <div className="pt-40 text-center text-white">Not found</div>;

  return (
    <div className="pt-24 pb-20 px-8 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 mb-8 font-bold text-sm uppercase"
      >
        ← Back
      </button>
      <div className="flex flex-col md:flex-row gap-12">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600'}
          className="w-full md:w-80 rounded-2xl shadow-2xl border border-gray-800"
          alt={movie.Title}
        />
        <div className="flex-1">
          <h1 className="text-6xl font-black mb-4">{movie.Title}</h1>
          <p className="text-blue-500 font-bold mb-6 italic">
            {movie.Genre} • {movie.Year} • {movie.Runtime}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">{movie.Plot}</p>
          <button
            onClick={() => toggleFavorite(movie.imdbID)}
            className={`px-12 py-4 rounded-xl font-black transition-all ${
              favorites.includes(movie.imdbID)
                ? 'bg-red-600'
                : 'bg-white text-black hover:bg-blue-500 hover:text-white'
            }`}
          >
            {favorites.includes(movie.imdbID) ? '❤️ In Cabinet' : '🤍 Save to Cabinet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
