import { TaskModel } from "@/models/task/task-model";
import { TaskCard } from "../TaskCard";

type TasksListProps = {
  tasks: TaskModel[];
};

export function TasksList({ tasks }: TasksListProps) {
  return (
    <ul className="list-none">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}
