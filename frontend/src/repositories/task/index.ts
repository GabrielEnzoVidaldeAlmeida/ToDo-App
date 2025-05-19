import { JsonTaskRepository } from "./json-task-repository";
import { TaskRepository } from "./task-repository";

export const taskRepository: TaskRepository = new JsonTaskRepository();
