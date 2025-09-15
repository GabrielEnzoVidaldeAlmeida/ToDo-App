import { Priority, Task } from '../entities/task.entity';

export class TaskResponseDto {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly done: boolean;
  readonly priority: Priority;
  readonly createdAt: Date;

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.content = task.content;
    this.done = task.done;
    this.priority = task.priority;
    this.createdAt = task.createdAt;
  }
}
