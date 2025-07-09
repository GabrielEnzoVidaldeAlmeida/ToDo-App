"use server";

import { drizzleDb } from "@/db/drizzle";
import { tasksTable } from "@/db/drizzle/schemas";
import { taskRepository } from "@/repositories/task";
// import { asyncDelay } from "@/utils/async-delay";
// import { logColor } from "@/utils/log-color";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function deleteTaskAction(id: string) {
  //TODO: Verificar usuário logado

  if (!id || typeof id !== "string") {
    return {
      error: "Dados inválidos",
    };
  }

  const task = await taskRepository.findById(id).catch(() => undefined);

  if (!task) {
    return {
      error: "Tarefa não exista na base de dados",
    };
  }

  await drizzleDb.delete(tasksTable).where(eq(tasksTable.id, id));

  revalidateTag("tasks");
}
