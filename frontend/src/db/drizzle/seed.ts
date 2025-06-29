import { JsonTaskRepository } from "@/repositories/task/json-task-repository";
import { drizzleDb } from ".";
import { tasksTable } from "./schemas";

(async () => {
  const jsonTaskRepository = new JsonTaskRepository();
  const tasks = await jsonTaskRepository.findAll();

  try {
    await drizzleDb.delete(tasksTable);
    await drizzleDb.insert(tasksTable).values(tasks);

    console.log(`${tasks.length} tarefas foram salvas na base de dados.`);
  } catch (e) {
    console.log("Ocorreu um erro: ", e);
  }
})();
