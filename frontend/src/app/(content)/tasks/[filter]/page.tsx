import { TasksList } from "@/components/TasksList";
import {
  findAllTasksCached,
  findTasksDone,
  findTasksPending,
} from "@/libs/task/queries";
import { TaskModel } from "@/models/task/task-model";
import { notFound } from "next/navigation";

type TaskFilterFn = () => Promise<TaskModel[]>;

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

  return <TasksList tasks={tasks} />;
}
