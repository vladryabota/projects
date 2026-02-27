import React from 'react';

interface Props {
  query: string;
  setQuery: (val: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<Props> = ({ query, setQuery, onSearch }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-12">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for movies (e.g. Inception, Matrix...)"
        className="w-full bg-gray-900 border border-gray-800 text-white rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-lg shadow-2xl"
      />
      <button
        onClick={onSearch}
        className="absolute right-3 top-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
