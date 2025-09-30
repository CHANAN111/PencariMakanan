// src/components/LoginButton.js

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image"; // Kita akan gunakan Next/Image untuk optimasi

export default function LoginButton() {
  const { data: session, status } = useSession();

  // Saat status masih loading, tampilkan pesan sederhana
  if (status === "loading") {
    return <p>Memuat...</p>;
  }

  // Jika sesi ada (pengguna sudah login), tampilkan info pengguna dan tombol logout
  if (session) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
          />
        )}
        <span>
          Halo, <strong>{session.user.name}</strong>
        </span>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }

  // Jika tidak ada sesi (pengguna belum login), tampilkan tombol login
  return (
    <div>
      <p>Anda belum login.</p>
      <button onClick={() => signIn("google")}>Login dengan Google</button>
    </div>
  );
}
