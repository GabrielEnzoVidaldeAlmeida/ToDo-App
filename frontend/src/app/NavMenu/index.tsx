// components/NavMenu.tsx
"use client";
import { PublicUserDto } from "@/libs/user/schema";
import { useState } from "react";

export default function NavMenu({ user }: { user: PublicUserDto }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>{user.name}</button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow">
          <a href="/profile">Perfil</a>
          <button
            onClick={() => {
              /* logout */
            }}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
