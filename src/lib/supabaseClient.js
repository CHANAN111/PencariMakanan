// src/lib/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// --- LANGKAH DEBUGGING ---
console.log("Membaca environment variables di client...");
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
// --- AKHIR LANGKAH DEBUGGING ---

// Ambil URL dan Kunci API dari file .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Buat dan ekspor client Supabase agar bisa digunakan di seluruh aplikasi
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
