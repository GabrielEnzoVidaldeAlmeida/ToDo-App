"use server";

import { getCurrentUser } from "@/libs/login/manage-login";
import { taskRepository } from "@/repositories/task";
import { revalidateTag } from "next/cache";

export async function deleteTaskAction(id: string) {
  //TODO: Verificar usuário logado
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return {
      error: "Você precisa estar logado para deletar uma tarefa",
    };
  }

  if (!id || typeof id !== "string") {
    return {
      error: "Dados inválidos",
    };
  }

  try {
    await taskRepository.delete(id, currentUser.id);
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
