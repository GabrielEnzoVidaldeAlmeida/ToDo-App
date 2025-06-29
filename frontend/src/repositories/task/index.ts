import { DrizzleTaskRepository } from "./drizzle-task-repository";
import { TaskRepository } from "./task-repository";

export const taskRepository: TaskRepository = new DrizzleTaskRepository();
