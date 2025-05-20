import { TaskModel } from "@/models/task/task-model";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { TaskRepository } from "./task-repository";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "tasks.json"
);

export class JsonTaskRepository implements TaskRepository {
  private async readFromDisk(): Promise<TaskModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const parsedJson = JSON.parse(jsonContent);
    const { tasks } = parsedJson;
    return tasks;
  }

  async findAll(): Promise<TaskModel[]> {
    const tasks = await this.readFromDisk();
    return tasks;
  }

  async findDone(): Promise<TaskModel[]> {
    const tasks = await this.findAll();
    const taskDone = tasks.filter((task) => task.done);
    return taskDone;
  }

  async findPending(): Promise<TaskModel[]> {
    const tasks = await this.findAll();
    const taskPending = tasks.filter((task) => !task.done);
    return taskPending;
  }

  async findById(id: string): Promise<TaskModel> {
    const tasks = await this.findAll();
    const task = tasks.find((task) => task.id === id);

    if (!task) throw new Error("Tarefa não encontrada.");

    return task;
  }
}

// ---TESTES---

// (async () => {
//   const repo = new JsonTaskRepository();

//   try {
//     const tasks = await repo.findByPending();
//     console.log("Tarefas encontradas:", tasks);
//   } catch (error) {
//     console.error("Erro ao buscar tarefas:", error);
//   }
// })();

//   try {
//     const tasks = await repo.findAll();
//     console.log("Tarefas encontradas:", tasks);
//   } catch (error) {
//     console.error("Erro ao buscar tarefas:", error);
//   }
// })();

//   try {
//     const tasks = await repo.findById("2");
//     console.log("Tarefas encontradas:", tasks);
//   } catch (error) {
//     console.error("Erro ao buscar tarefas:", error);
//   }
// })();
