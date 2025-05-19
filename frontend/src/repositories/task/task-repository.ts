import { TaskModel } from "@/models/task/task-model";

export interface TaskRepository {
  findAll(): Promise<TaskModel[]>;
  findById(id: string): Promise<TaskModel>;
}
