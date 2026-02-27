import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

interface Props {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  BASE_URL: string;
}

const Catalog: React.FC<Props> = ({ favorites, toggleFavorite, BASE_URL }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('Marvel');
  const [lastSearch, setLastSearch] = useState('Marvel');
  const [page, setPage] = useState(1);
  const [type, setType] = useState(''); // movie, series, episode
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = async (term: string, pageNum: number, filterType: string) => {
    if (!term.trim()) return;
    setLoading(true);
    try {
      // Sestavení URL s filtry a stránkou
      const typeParam = filterType ? `&type=${filterType}` : '';
      const res = await fetch(`${BASE_URL}&s=${term}&page=${pageNum}${typeParam}`);
      const data = await res.json();

      if (data.Search) {
        setMovies(
          data.Search.map((m: any) => ({
            id: m.imdbID,
            title: m.Title,
            genre: m.Year,
            rating: 'N/A',
            poster:
              m.Poster !== 'N/A' ? m.Poster : 'https://via.placeholder.com/400x600?text=No+Poster',
          }))
        );
        setTotalResults(parseInt(data.totalResults));
        setLastSearch(term);
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Reakce na změnu stránky nebo filtru
  useEffect(() => {
    fetchMovies(lastSearch, page, type);
  }, [page, type]);

  const handleNewSearch = () => {
    setPage(1);
    fetchMovies(query, 1, type);
  };

  return (
    <div className="pt-24 pb-12 px-8 max-w-7xl mx-auto min-h-screen bg-black">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
          Cinema Hub
        </h1>

        <SearchBar query={query} setQuery={setQuery} onSearch={handleNewSearch} />

        {/* FILTRY */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[
            { label: 'All', value: '' },
            { label: 'Movies', value: 'movie' },
            { label: 'Series', value: 'series' },
          ].map((f) => (
            <button
              key={f.label}
              onClick={() => {
                setType(f.value);
                setPage(1);
              }}
              className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                type === f.value
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-800 text-gray-500 hover:border-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      {/* INFO LIŠTA A STRÁNKOVÁNÍ */}
      <div className="flex justify-between items-center mb-8 text-sm text-gray-500 font-mono">
        <div>Results: {totalResults}</div>
        <div className="flex items-center gap-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="hover:text-white disabled:opacity-20 transition-colors"
          >
            PREV
          </button>
          <span className="text-blue-500 font-bold bg-gray-900 px-3 py-1 rounded">
            {page} / {Math.ceil(totalResults / 10) || 1}
          </span>
          <button
            disabled={page >= Math.ceil(totalResults / 10)}
            onClick={() => setPage((p) => p + 1)}
            className="hover:text-white disabled:opacity-20 transition-colors"
          >
            NEXT
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-900 aspect-[2/3] rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {movies.map((m: any) => (
            <MovieCard
              key={m.id}
              movie={m}
              isFavorite={favorites.includes(m.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
