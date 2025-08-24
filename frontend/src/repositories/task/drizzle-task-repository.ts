import { Priority, TaskModel } from "@/models/task/task-model";

import { TaskRepository } from "./task-repository";
import { logColor } from "@/utils/log-color";
import { drizzleDb } from "@/db/drizzle";
import { asyncDelay } from "@/utils/async-delay";
import { tasksTable } from "@/db/drizzle/schemas";
import { and, eq } from "drizzle-orm";

// const ROOT_DIR = process.cwd();
// const JSON_POSTS_FILE_PATH = resolve(
//   ROOT_DIR,
//   "src",
//   "db",
//   "seed",
//   "tasks.json"
// );

// const SIMULATE_WAIT_IN_MS = 1000;
const simulateWaitMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

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
  async findAll(userId: string): Promise<TaskModel[]> {
    await asyncDelay(simulateWaitMs);
    logColor("findAll", Date.now());

    const tasks = await drizzleDb.query.tasks.findMany({
      where: (tasks, { eq }) => eq(tasks.userId, userId),
      orderBy: (tasks, { desc }) => desc(tasks.createdAt),
    });

    return tasks.map((task) => ({
      ...task,
      priority: mapPriority(task.priority),
      done: Boolean(task.done), // só pra garantir que seja boolean
    }));
  }

  async findDone(userId: string): Promise<TaskModel[]> {
    await asyncDelay(simulateWaitMs, true);
    logColor("findDone", Date.now());

    const tasksFromDb = await drizzleDb.query.tasks.findMany({
      where: (tasks, { eq, and }) =>
        and(eq(tasks.done, true), eq(tasks.userId, userId)),
    });
    const tasks: TaskModel[] = tasksFromDb.map((task) => ({
      ...task,
      priority: mapPriority(task.priority),
      done: Boolean(task.done),
    }));

    return tasks;
  }

  async findPending(userId: string): Promise<TaskModel[]> {
    await asyncDelay(simulateWaitMs, true);
    logColor("findPending", Date.now());

    const tasksFromDb = await drizzleDb.query.tasks.findMany({
      where: (tasks, { eq, and }) =>
        and(eq(tasks.done, false), eq(tasks.userId, userId)),
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

  async findById(id: string, userId: string): Promise<TaskModel> {
    await asyncDelay(simulateWaitMs, true);

    logColor("findById", Date.now());

    const task = await drizzleDb.query.tasks.findFirst({
      where: (tasks, { eq, and }) =>
        and(eq(tasks.id, id), eq(tasks.userId, userId)),
    });

    if (!task) throw new Error("Tarefa não encontrada para ID");

    return { ...task, priority: task.priority as Priority };
  }

  async create(task: TaskModel, userId: string): Promise<TaskModel> {
    const taskExists = await drizzleDb.query.tasks.findFirst({
      where: (tasks, { eq }) => eq(tasks.id, task.id),
      columns: { id: true },
    });

    if (!!taskExists) {
      throw new Error("Tarefa com ID já existe na base de dados");
    }

    const taskWithUser = {
      ...task,
      userId,
    };

    await drizzleDb.insert(tasksTable).values(taskWithUser);
    return task;
  }

  async delete(id: string, userId: string): Promise<TaskModel> {
    const task = await drizzleDb.query.tasks.findFirst({
      where: (tasks, { eq, and }) =>
        and(eq(tasks.id, id), eq(tasks.userId, userId)),
    });

    if (!task) {
      throw new Error("Tarefa não existe");
    }

    const taskValidPriority: TaskModel = {
      ...task,
      priority: task.priority as Priority,
    };

    await drizzleDb
      .delete(tasksTable)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)));

    return taskValidPriority;
  }

  async update(
    id: string,
    newTaskData: Omit<TaskModel, "id" | "createdAt" | "done">,
    userId: string
  ): Promise<TaskModel> {
    const oldTask = await drizzleDb.query.tasks.findFirst({
      where: (tasks, { eq, and }) =>
        and(eq(tasks.id, id), eq(tasks.userId, userId)),
    });

    if (!oldTask) {
      throw new Error("Tarefa não existe");
    }

    const taskData = {
      title: newTaskData.title,
      content: newTaskData.content,
      priority: newTaskData.priority,
    };
    await drizzleDb
      .update(tasksTable)
      .set(taskData)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)));

    return {
      ...oldTask,
      ...taskData,
    };
  }

  async toogleStatus(
    id: string,
    userId: string,
    currentDone: boolean
  ): Promise<void> {
    await drizzleDb
      .update(tasksTable)
      .set({ done: !currentDone })
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, userId)));
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
