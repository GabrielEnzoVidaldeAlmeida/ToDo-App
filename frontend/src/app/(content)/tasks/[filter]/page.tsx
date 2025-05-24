import { TasksList } from "@/components/TasksList";
import {
  findAllTasksCached,
  findTasksDone,
  findTasksPending,
} from "@/libs/task/queries";
import { notFound } from "next/navigation";

type TasksPageProps = {
  params: {
    filter: string;
  };
};

export default async function TasksPage({ params }: TasksPageProps) {
  const filter = params.filter;

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
      break;
    default:
      notFound();
  }

  return <TasksList tasks={tasks} />;
}
