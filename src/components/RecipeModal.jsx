import React from "react";

export default function RecipeModal({
  recipe,
  onClose,
  onToggleFavorite,
  favorites,
}) {
  if (!recipe) {
    return null;
  }

  const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);
  // --- BAGIAN BARU UNTUK MEMPROSES BAHAN ---
  // Membuat array untuk menampung daftar bahan yang sudah diformat
  const ingredients = [];
  // Loop dari 1 sampai 20 (karena API menyediakan hingga 20 bahan)
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    // Jika bahan ada dan tidak kosong, tambahkan ke array
    if (ingredient) {
      ingredients.push(`${measure} - ${ingredient}`);
    } else {
      // Hentikan loop jika sudah tidak ada bahan lagi
      break;
    }
  }
  // -----------------------------------------

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white text-4xl"
          >
            &times;
          </button>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            {recipe.strMeal}
          </h2>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <button
            onClick={() => onToggleFavorite(recipe)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm mb-4 transition-colors ${
              isFavorite
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isFavorite ? "Hapus dari Favorit" : "Simpan ke Favorit"}
          </button>

          {/* --- BAGIAN BARU UNTUK MENAMPILKAN DAFTAR BAHAN --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-yellow-300">
                Ingredients
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            {/* ---------------------------------------------------- */}
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-yellow-300">
                Instructions
              </h3>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {recipe.strInstructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
