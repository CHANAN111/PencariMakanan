// src/app/page.js

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // 1. Impor useSession

// Impor komponen Anda
import RecipeList from "../components/RecipeList";
import SearchForm from "../components/SearchForm";
import RecipeModal from "../components/RecipeModal";
import LoginButton from "../components/LoginButton";

export default function App() {
  // --- STATE LAMA (TETAP DIPAKAI) ---
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // --- MENGGUNAKAN SESI PENGGUNA ---
  const { data: session } = useSession(); // 3. Dapatkan data sesi pengguna

  // --- EFEK BARU: MEMUAT FAVORIT DARI SUPABASE ---
  // --- EFEK BARU: MEMUAT FAVORIT DARI API ROUTE KITA ---
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) {
        setFavorites([]);
        return;
      }

      try {
        // Panggil "Manajer" kita dengan instruksi untuk tidak menyimpan cache
        const response = await fetch("/api/favorites", { cache: "no-store" }); // <-- PERUBAHAN DI SINI

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }

        const data = await response.json();

        const formattedFavorites = data.map((fav) => ({
          idMeal: fav.recipe_id,
          strMeal: fav.recipe_name,
          strMealThumb: fav.recipe_image,
        }));
        setFavorites(formattedFavorites);
      } catch (error) {
        console.error("Gagal mengambil data favorit:", error);
      }
    };

    fetchFavorites();
  }, [session]);

  // --- FUNGSI LAMA (TETAP DIPAKAI) ---
  const handleSearch = async (e) => {
    // ... (kode ini tidak berubah)
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
    // ... (kode ini tidak berubah)
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
    // ... (kode ini tidak berubah)
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  // --- FUNGSI FAVORIT YANG SUDAH DIPERBAIKI ---
  const toggleFavorite = async (recipe) => {
    if (!session) {
      alert("Silakan login untuk menyimpan resep favorit!");
      return;
    }

    const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);
    const action = isFavorite ? "remove" : "add";

    // Optimistic UI Update: Langsung perbarui tampilan agar responsif
    if (action === "add") {
      setFavorites([...favorites, recipe]);
    } else {
      setFavorites(favorites.filter((fav) => fav.idMeal !== recipe.idMeal));
    }

    // Kirim permintaan ke "Manajer" (API Route)
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe, action }),
      });
    } catch (error) {
      console.error("Gagal memperbarui favorit:", error);
      // Rollback UI jika gagal (opsional, tapi praktik yang baik)
      setFavorites(favorites);
      alert("Gagal memperbarui favorit, silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 py-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-yellow-400">
            Pencari Resep Makanan
          </h1>
          <LoginButton />
        </header>

        <SearchForm
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />

        <RecipeList
          isLoading={isLoading}
          favorites={favorites}
          recipes={recipes}
          handleCardClick={handleCardClick}
          onToggleFavorite={toggleFavorite} // Pastikan onToggleFavorite di-pass ke RecipeList
        />

        {isModalOpen && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={closeModal}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}
      </div>
    </div>
  );
}
