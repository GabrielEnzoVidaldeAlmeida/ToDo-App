import { TaskModel } from "@/models/task/task-model";

export interface TaskRepository {
  findAll(userId: string): Promise<TaskModel[]>;
  findById(id: string, userId: string): Promise<TaskModel>;
  findDone(userId: string): Promise<TaskModel[]>;
  findPending(userId: string): Promise<TaskModel[]>;

  //Mutation
  create(task: TaskModel, userId: string): Promise<TaskModel>;
  delete(id: string, userId: string): Promise<TaskModel>;
  update(
    id: string,
    newTaskData: Omit<TaskModel, "id" | "createdAt" | "done">,
    userId: string
  ): Promise<TaskModel>;
  toogleStatus(id: string, userId: string, currentDone: boolean): Promise<void>;
}
