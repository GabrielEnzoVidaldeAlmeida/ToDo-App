import { TaskModel } from "@/models/task/task-model";

export type CreateTask = Omit<TaskModel, "updatedAt" | "done">;

export const makePartialTask = (task?: Partial<TaskModel>): TaskModel => {
  return {
    id: task?.id || "",
    title: task?.title || "",
    content: task?.content || "",
    createdAt: task?.createdAt || "",
    priority: task?.priority || "Normal",
    done: false,
  };
};

export const makeTask = (task: TaskModel): CreateTask => {
  return makePartialTask(task);
};
