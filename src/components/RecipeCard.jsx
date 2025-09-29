import React from "react";

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-shadow duration-300 cursor-pointer">
      <img
        src={recipe.strMealThumb} // Pastikan properti ini yang digunakan
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate" title={recipe.strMeal}>
          {recipe.strMeal}
        </h3>
      </div>
    </div>
  );
}
