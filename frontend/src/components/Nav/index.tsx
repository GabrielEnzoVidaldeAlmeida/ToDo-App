import { Plus } from "lucide-react";

export function Nav() {
  return (
    <nav className="flex justify-between items-center bg-black text-white p-4">
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
        Olá, Gabriel Enzo
      </h1>

      <p className="flex items-center gap-1 sm:text-lg md:text-xl lg:text-2xl ">
        <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6" />
        Nova Tarefa
      </p>
    </nav>
  );
}
