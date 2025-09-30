// src/app/layout.js

import AuthProvider from "@/components/AuthProvider"; // <-- 1. IMPORT
import "./globals.css";

// (Baris lain seperti import font mungkin ada di sini, biarkan saja)

export const metadata = {
  title: "Website Pencari Makanan", // Ganti judul jika perlu
  description: "Temukan resep makanan favoritmu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {" "}
          {/* <-- 2. BUNGKUS CHILDREN */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
