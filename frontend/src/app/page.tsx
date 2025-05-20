import { TasksList } from "@/components/TasksList";
import { taskRepository } from "@/repositories/task";

export default async function HomePage() {
  const tasks = await taskRepository.findAll();

  return (
    <div className="px-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
        Olá, Gabriel Enzo
      </h1>
      <TasksList tasks={tasks} />
    </div>
  );
}
