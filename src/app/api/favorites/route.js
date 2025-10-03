// src/app/api/favorites/route.js

export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function GET(request) {
  // ... (Fungsi GET tidak berubah, biarkan seperti ini)
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_email", session.user.email);
  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return NextResponse.json(data);
}

// --- TAMBAHKAN FUNGSI BARU INI ---
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { recipe, action } = await request.json(); // Dapatkan data resep dan aksi ('add'/'remove')
  const userEmail = session.user.email;

  if (action === "add") {
    // Logika untuk menambah favorit
    const { error } = await supabase.from("favorites").insert([
      {
        user_email: userEmail,
        recipe_id: recipe.idMeal,
        recipe_name: recipe.strMeal,
        recipe_image: recipe.strMealThumb,
      },
    ]);
    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    return NextResponse.json({ message: "Favorite added" });
  } else if (action === "remove") {
    // Logika untuk menghapus favorit
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_email", userEmail)
      .eq("recipe_id", recipe.idMeal);
    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    return NextResponse.json({ message: "Favorite removed" });
  }

  // Jika aksi tidak valid
  return new NextResponse(JSON.stringify({ error: "Invalid action" }), {
    status: 400,
  });
}
