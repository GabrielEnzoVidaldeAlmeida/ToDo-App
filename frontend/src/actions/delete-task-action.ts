"use server";

import { taskRepository } from "@/repositories/task";
import { revalidateTag } from "next/cache";

export async function deleteTaskAction(id: string) {
  //TODO: Verificar usuário logado

  if (!id || typeof id !== "string") {
    return {
      error: "Dados inválidos",
    };
  }

  try {
    await taskRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
    return {
      error: "Erro desconhecido",
    };
  }

  revalidateTag("tasks");

  return {
    error: "",
  };
}
