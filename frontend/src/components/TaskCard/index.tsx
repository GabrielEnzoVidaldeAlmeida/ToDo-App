import { TaskModel } from "@/models/task/task-model";
import { PriorityBadge } from "../PriorityBadge";
import { StatusIcon } from "../StatusIcon";
import { PencilIcon, TrashIcon } from "lucide-react";

type TaskCardProps = {
  task: TaskModel;
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="mt-2  w-80 rounded shadow-[0_1px_4px_rgba(0,0,0,0.6)] hover:scale-102 transition">
      <div className="flex justify-between py-2 items-center px-4 border-b-2">
        <h2 className=" w-50 truncate text-xl" title={task.title}>
          {task.title}
        </h2>

        <PriorityBadge priority={task.priority} />
      </div>

      <p className="px-4">{task.content}</p>

      <div className="flex items-center justify-between pt-1 pb-1 px-4 rounded-b bg-gray-300">
        <div className="py-2">
          <div>
            <p className="text-sm border-1 px-1 rounded">
              19/05/2025 às 22h34m
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <PencilIcon className="stroke-blue-800 cursor-pointer" />
          <TrashIcon className="stroke-red-800 cursor-pointer" />
          <StatusIcon done={task.done} />
        </div>
      </div>
    </div>
  );
}
