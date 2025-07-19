"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Nav() {
  const [handleMenu, setHandleMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setHandleMenu(false);
      }
    }

    if (handleMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleMenu]);

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

      <div className="relative flex items-center" ref={menuRef}>
        <button onClick={() => setHandleMenu((prev) => !prev)}>
          <Image
            src="/images/icon-teste.webp"
            alt="icon"
            width={50}
            height={50}
            className={clsx(
              "rounded border-2 border-gray-200 object-cover hover:brightness-80 transition cursor-pointer",
              "w-8 h-8 sm:h-10 sm:w-10 md:w-12 md:h-12"
            )}
            priority
          />
        </button>

        {handleMenu && (
          <div className="absolute top-full right-0 mt-2 flex flex-col bg-white pr-8 pl-3 py-1 gap-1 underline z-50 shadow-lg rounded md:pr-12 md:pl-4">
            <Link
              href="#"
              className="text-black hover:decoration-black hover:text-blue-700"
            >
              Perfil
            </Link>
            <Link
              href="#"
              className="text-black hover:decoration-black hover:text-blue-700"
            >
              Sair
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
