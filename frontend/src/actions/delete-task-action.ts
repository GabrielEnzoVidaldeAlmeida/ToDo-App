"use server";

import { drizzleDb } from "@/db/drizzle";
import { tasksTable } from "@/db/drizzle/schemas";
// import { asyncDelay } from "@/utils/async-delay";
// import { logColor } from "@/utils/log-color";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function deleteTaskAction(id: string) {
  //TODO: Remover log abaixo

  //TODO: Aplicar react toastify para mensagens com error
  if (!id || typeof id !== "string") {
    return {
      error: "Dados inválidos",
    };
  }
  //TODO: Criar validação por ID para saber se a task existe na base de dados (verificar se função findById já existe):
  // const task = await taskRepository.findById()

  await drizzleDb.delete(tasksTable).where(eq(tasksTable.id, id));

  revalidateTag("tasks");
}
