"use client";

export default function SearchForm({
  query,
  setQuery,
  handleSearch,
  isLoading,
}) {
  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Contoh: chicken, beef, pasta..."
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition duration-300 disabled:bg-gray-500"
      >
        {isLoading ? "..." : "Cari"}
      </button>
    </form>
  );
}
