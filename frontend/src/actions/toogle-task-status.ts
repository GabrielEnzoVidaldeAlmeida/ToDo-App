"use server";

import { getCurrentUser } from "@/libs/login/manage-login";
import { taskRepository } from "@/repositories/task";
import { revalidateTag } from "next/cache";

export async function toogleTaskStatus(id: string, currentDone: boolean) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Você precisa estar logado para alternar o status da tarefa",
    };
  }

  await taskRepository.toogleStatus(id, user.id, currentDone);
  revalidateTag("tasks");
}
