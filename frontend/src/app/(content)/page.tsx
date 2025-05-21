import { FilterTasks } from "@/components/FilterTasks";
import { TasksList } from "@/components/TasksList";
import { taskRepository } from "@/repositories/task";

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
      tasks = await taskRepository.findDone();
      break;
    case "pending":
      tasks = await taskRepository.findPending();
      break;
    case "all":
      tasks = await taskRepository.findAll();
  }

  return (
    <div className="px-4 mb-4">
      <div className="flex gap-2 my-4">
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
      <TasksList tasks={tasks} />
    </div>
  );
}
