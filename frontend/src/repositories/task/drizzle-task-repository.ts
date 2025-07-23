import { Priority, TaskModel } from "@/models/task/task-model";

import { TaskRepository } from "./task-repository";
import { logColor } from "@/utils/log-color";
import { drizzleDb } from "@/db/drizzle";
import { asyncDelay } from "@/utils/async-delay";
import { tasksTable } from "@/db/drizzle/schemas";

// const ROOT_DIR = process.cwd();
// const JSON_POSTS_FILE_PATH = resolve(
//   ROOT_DIR,
//   "src",
//   "db",
//   "seed",
//   "tasks.json"
// );

const SIMULATE_WAIT_IN_MS = 1000;

function mapPriority(priority: string): Priority {
  switch (priority) {
    case "Normal":
      return "Normal";
    case "Eventual":
      return "Eventual";
    case "Urgente":
      return "Urgente";
    default:
      return "Normal";
  }
}

export class DrizzleTaskRepository implements TaskRepository {
  async findAll(): Promise<TaskModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS);
    logColor("findAll", Date.now());

    const tasks = await drizzleDb.query.tasks.findMany({
      orderBy: (tasks, { desc }) => desc(tasks.createdAt),
    });

    return tasks.map((task) => ({
      ...task,
      priority: mapPriority(task.priority),
      done: Boolean(task.done), // só pra garantir que seja boolean
    }));
  }

  async findDone(): Promise<TaskModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor("findDone", Date.now());

    const tasksFromDb = await drizzleDb.query.tasks.findMany({
      where: (tasks, { eq }) => eq(tasks.done, true),
    });
    const tasks: TaskModel[] = tasksFromDb.map((task) => ({
      ...task,
      priority: mapPriority(task.priority),
      done: Boolean(task.done),
    }));

    return tasks;
  }

  async findPending(): Promise<TaskModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor("findPending", Date.now());

    const tasksFromDb = await drizzleDb.query.tasks.findMany({
      where: (tasks, { eq }) => eq(tasks.done, false),
    });
    const tasks: TaskModel[] = tasksFromDb.map((task) => ({
      ...task,
      priority: mapPriority(task.priority),
      done: Boolean(task.done),
    }));

    return tasks;
  }

  //TODO: Criar função findById e utilizar ela nas actions
  // async findById(id: string): Promise<TaskModel> {
  //   const tasks = await this.findAll();
  //   const task = tasks.find((task) => task.id === id);

  //   if (!task) throw new Error("Tarefa não encontrada.");

  //   return task;
  // }

  async findById(id: string): Promise<TaskModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    logColor("findById", Date.now());

    const task = await drizzleDb.query.tasks.findFirst({
      where: (tasks, { eq }) => eq(tasks.id, id),
    });

    if (!task) throw new Error("Tarefa não encontrada para ID");

    return { ...task, priority: task.priority as Priority };
  }

  async create(task: TaskModel): Promise<TaskModel> {
    const taskExists = await drizzleDb.query.tasks.findFirst({
      where: (tasks, { eq }) => eq(tasks.id, task.id),
      columns: { id: true },
    });

    if (!!taskExists) {
      throw new Error("Tarefa com ID já existe na base de dados");
    }

    await drizzleDb.insert(tasksTable).values(task);
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
