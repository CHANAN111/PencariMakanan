"use client";

import RecipeCard from "./RecipeCard";

// Komponen ini menerima semua data yang diperlukan untuk menampilkan daftar
export default function RecipeList({
  isLoading,
  favorites,
  recipes,
  handleCardClick,
}) {
  return (
    <main>
      {/* BAGIAN FAVORIT */}
      {favorites.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 border-l-4 border-yellow-400 pl-3">
            ⭐ Resep Favorit Anda
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((favRecipe) => (
              <div
                key={favRecipe.idMeal}
                onClick={() => handleCardClick(favRecipe.idMeal)}
              >
                <RecipeCard recipe={favRecipe} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BAGIAN HASIL PENCARIAN */}
      {isLoading && (
        <p className="text-center text-yellow-400 text-xl">Mencari resep...</p>
      )}

      {/* Menambahkan judul untuk hasil pencarian */}
      <h2 className="text-2xl font-bold text-gray-300 mb-4">Hasil Pencarian</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            onClick={() => handleCardClick(recipe.idMeal)}
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

      {!isLoading && recipes.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Tidak ada resep ditemukan. Coba kata kunci lain.
        </p>
      )}
    </main>
  );
}
