import { TaskModel } from "@/models/task/task-model";
import { PriorityBadge } from "../PriorityBadge";
import { StatusIcon } from "../StatusIcon";

type TaskCardProps = {
  task: TaskModel;
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="mt-2 border-2  rounded-2xl">
      <h2 className="px-4 border-b-2 text-xl">{task.title} - 19/05/2025</h2>
      <p className="px-4">{task.content}</p>

      <div className="flex items-center justify-between pt-1 pb-1 px-4 rounded-b-2xl bg-gray-300">
        <div className="flex gap-1">
          <p className="my-1 ">Prioridade:</p>
          <PriorityBadge priority={task.priority} />
        </div>

        <div>
          <StatusIcon done={task.done} />
        </div>
      </div>
    </div>
  );
}
