"use client";

import Link from "next/link";

export function Nav() {
  //TODO:Utilizar CLSX

  return (
    <nav className="flex justify-between items-center bg-black text-white p-4">
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
        <Link
          href="/"
          className="hover:cursor-pointer hover:brightness-90 transition"
        >
          ToDo App
        </Link>
      </h1>

      <div className="relative flex items-center">
        <h1 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-extrabold bg-white text-black px-2 rounded">
          Mesa da Vovó
        </h1>
      </div>
    </nav>
  );
}
