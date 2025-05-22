import { FilterTasks } from "@/components/FilterTasks";
import { TasksList } from "@/components/TasksList";
import {
  findAllTasksCached,
  findTasksDone,
  findTasksPending,
} from "@/libs/task/queries";

import { PlusIcon } from "lucide-react";
import Link from "next/link";

type HomePageProps = {
  searchParams: {
    filter?: "all" | "done" | "pending";
  };
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const filter = searchParams?.filter || "all";

  let tasks;

  switch (filter) {
    case "done":
      tasks = await findTasksDone();
      break;
    case "pending":
      tasks = await findTasksPending();
      break;
    case "all":
      tasks = await findAllTasksCached();
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex justify-center sm:justify-start gap-2 my-4">
          <FilterTasks
            linkProps={{ href: "/?filter=all" }}
            labelFilter="Todas"
            isActive={filter === "all"}
          />
          <FilterTasks
            linkProps={{ href: "/?filter=pending" }}
            labelFilter="Pendentes"
            isActive={filter === "pending"}
          />
          <FilterTasks
            linkProps={{ href: "/?filter=done" }}
            labelFilter="Concluídas"
            isActive={filter === "done"}
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
      <TasksList tasks={tasks} />
    </div>
  );
}
