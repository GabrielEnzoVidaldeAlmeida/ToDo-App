import { TaskModel } from "@/models/task/task-model";

export interface TaskRepository {
  findAll(): Promise<TaskModel[]>;
  findById(id: string): Promise<TaskModel>;
  findDone(): Promise<TaskModel[]>;
  findPending(): Promise<TaskModel[]>;

  //Mutation
  create(task: TaskModel): Promise<TaskModel>;
}
