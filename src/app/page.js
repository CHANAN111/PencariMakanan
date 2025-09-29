"use client";

import { useState, useEffect, use } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import RecipeList from "../components/RecipeList";
import SearchForm from "../components/SearchForm";

export default function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // 3. useEffect untuk MEMUAT favorit saat aplikasi pertama kali dibuka
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("recipeFavorites")) || [];
    setFavorites(storedFavorites);
  }, []); // Array kosong berarti efek ini hanya berjalan sekali saat komponen dimuat

  // 4. useEffect untuk MENYIMPAN favorit setiap kali state 'favorites' berubah
  useEffect(() => {
    localStorage.setItem("recipeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = async (mealId) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();
      setSelectedRecipe(data.meals[0]);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Gagal mengambil detail resep:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  // 5. Fungsi baru untuk menambah/menghapus favorit
  const toggleFavorite = (recipe) => {
    // Cek apakah resep sudah ada di favorit
    const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

    if (isFavorite) {
      // Jika sudah ada, hapus dari favorit
      setFavorites(favorites.filter((fav) => fav.idMeal !== recipe.idMeal));
    } else {
      // Jika belum ada, tambahkan ke favorit
      setFavorites([...favorites, recipe]);
    }
  };

  // PASTIKAN BAGIAN RETURN INI ADA DI DALAM FUNGSI APP ANDA
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400">
            🍳 Pencari Resep Makanan
          </h1>
          <p className="text-gray-400 mt-2">
            Ketik nama bahan dan temukan resep favoritmu!
          </p>
        </header>

        <SearchForm
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />
        {/* Manajer mendelegasikan tugas ke Staf Display */}
        <RecipeList
          isLoading={isLoading}
          favorites={favorites}
          recipes={recipes}
          handleCardClick={handleCardClick}
        />

        {isModalOpen && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={closeModal}
            // Kirim fungsi toggleFavorite dan daftar favorites sebagai props
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}
      </div>
    </div>
  );
}
