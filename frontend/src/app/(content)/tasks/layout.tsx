// app/tasks/layout.tsx
"use client";

import { ReactNode } from "react";
import { FilterTasks } from "@/components/FilterTasks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

type TasksLayoutProps = {
  children: ReactNode;
};

export default function TasksLayout({ children }: TasksLayoutProps) {
  const pathname = usePathname();

  const activeFilter = pathname?.split("/")[2] || "all";

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex justify-center sm:justify-start gap-2 my-4">
          <FilterTasks
            linkProps={{ href: "/tasks/all" }}
            labelFilter="Todas"
            isActive={activeFilter === "all"}
          />
          <FilterTasks
            linkProps={{ href: "/tasks/pending" }}
            labelFilter="Pendentes"
            isActive={activeFilter === "pending"}
          />
          <FilterTasks
            linkProps={{ href: "/tasks/done" }}
            labelFilter="Concluídas"
            isActive={activeFilter === "done"}
          />
        </div>

        <Link
          href="#"
          className="flex items-center gap-2 border-1 px-3 py-1 rounded bg-gray-200 hover:brightness-90 transition"
        >
          <PlusIcon className="w-4 h-4" />
          Adicionar tarefa
        </Link>
      </div>

      <div>{children}</div>
    </div>
  );
}
