// src/components/LoginButton.jsx

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-24 h-9 bg-gray-700 animate-pulse rounded-md"></div>
    );
  }

  // Jika sesi ada (pengguna sudah login)
  if (session) {
    return (
      <div className="flex items-center gap-4">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User Avatar"}
            width={40}
            height={40}
            className="rounded-full" // Menggunakan class Tailwind untuk border radius
          />
        )}
        <span className="hidden sm:block text-sm text-gray-300">
          Halo, <strong>{session.user.name}</strong>
        </span>
        <button
          onClick={() => signOut()}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  // Jika tidak ada sesi (pengguna belum login)
  // Kita tidak perlu <p> dan <div> lagi, cukup tombolnya saja
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-md transition-colors"
    >
      Login dengan Google
    </button>
  );
}
