import { TasksList } from "@/components/TasksList";
import {
  findAllTasksCached,
  findTasksDone,
  findTasksPending,
} from "@/libs/task/queries";
import { TaskModel } from "@/models/task/task-model";
import Link from "next/link";
import { notFound } from "next/navigation";

type TaskFilterFn = () => Promise<TaskModel[]>;

const emptyMessages: Record<string, string> = {
  done: "Você ainda não concluiu nenhuma tarefa.",
  pending: "Você não tem tarefas pendentes.",
  all: "Você ainda não possui nenhuma tarefa.",
};

const filterFunctions: Record<string, TaskFilterFn> = {
  done: findTasksDone,
  pending: findTasksPending,
  all: findAllTasksCached,
};

export default async function TasksPage({
  params,
}: {
  params: { filter: string };
}) {
  const { filter } = params;

  const fetchTasks = filterFunctions[filter];

  if (!fetchTasks) {
    notFound();
  }

  const tasks = await fetchTasks();

  if (tasks.length === 0) {
    return (
      <div>
        <p>{emptyMessages[filter] || "Nenhuma tarefa encontrada"}</p>
        {/* TODO: Testar apósa criar action DELETE */}
        {filter === "all" && (
          <Link
            href="#"
            className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Criar nova tarefa
          </Link>
        )}
      </div>
    );
  }

  return <TasksList tasks={tasks} />;
}
