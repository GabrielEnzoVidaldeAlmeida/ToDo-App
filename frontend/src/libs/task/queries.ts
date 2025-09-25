// import { taskRepository } from "@/repositories/task";
// import { getCurrentUser } from "@/libs/login/manage-login";

import { TaskModel } from "@/models/task/task-model";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cache } from "react";

// export async function findAllTasksCached() {
//   const user = await getCurrentUser();
//   if (!user) return [];
//   return await taskRepository.findAll(user.id);
// }

// export async function findTasksPending() {
//   const user = await getCurrentUser();
//   if (!user) return [];
//   return await taskRepository.findPending(user.id);
// }

// export async function findTasksDone() {
//   const user = await getCurrentUser();
//   if (!user) return [];
//   return await taskRepository.findDone(user.id);
// }

// export async function findByIdTask(id: string) {
//   const user = await getCurrentUser();
//   if (!user) throw new Error("Usuário não encontrado");
//   return await taskRepository.findById(id, user.id);
// }

export const findAllTasksCached = cache(async (): Promise<TaskModel[]> => {
  const res = await authenticatedApiRequest<TaskModel[]>("/task/me", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.success) return [];
  return res.data;
});

export const findTasksPending = cache(async (): Promise<TaskModel[]> => {
  const res = await authenticatedApiRequest<TaskModel[]>("/task/me/pending", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.success) return [];
  return res.data;
});

export const findTasksDone = cache(async (): Promise<TaskModel[]> => {
  const res = await authenticatedApiRequest<TaskModel[]>("/task/me/done", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.success) return [];
  return res.data;
});
