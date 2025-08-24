// import { taskRepository } from "@/repositories/task";
// import { unstable_cache } from "next/cache";
// import { cache } from "react";
// import { getCurrentUser } from "../login/manage-login";

//TODO: Tentar utilizar essas funções com algum cache depois

// export const findAllTasksCached = cache(
//   unstable_cache(
//     async () => {
//       const user = await getCurrentUser();
//       if (!user) return [];
//       return await taskRepository.findAll(user.id);
//     },
//     ["tasks"],
//     {
//       tags: ["tasks"],
//     }
//   )
// );

// export const findTasksPending = cache(
//   unstable_cache(
//     async () => {
//       const user = await getCurrentUser();
//       if (!user) return [];
//       return await taskRepository.findPending(user.id);
//     },
//     ["tasks"],
//     {
//       tags: ["tasks"],
//     }
//   )
// );

// export const findTasksDone = cache(
//   unstable_cache(
//     async () => {
//       const user = await getCurrentUser();
//       if (!user) return [];
//       return await taskRepository.findDone(user.id);
//     },
//     ["tasks"],
//     {
//       tags: ["tasks"],
//     }
//   )
// );

// export const findByIdTask = cache((id: string) =>
//   unstable_cache(
//     async () => {
//       const user = await getCurrentUser();
//       if (!user) throw new Error("Usuário não encontrado");
//       return await taskRepository.findById(id, user.id);
//     },
//     [`task-${id}`],
//     { tags: ["tasks"] }
//   )()
// );

import { taskRepository } from "@/repositories/task";
import { getCurrentUser } from "@/libs/login/manage-login";

export async function findAllTasksCached() {
  const user = await getCurrentUser();
  if (!user) return [];
  return await taskRepository.findAll(user.id);
}

export async function findTasksPending() {
  const user = await getCurrentUser();
  if (!user) return [];
  return await taskRepository.findPending(user.id);
}

export async function findTasksDone() {
  const user = await getCurrentUser();
  if (!user) return [];
  return await taskRepository.findDone(user.id);
}

export async function findByIdTask(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Usuário não encontrado");
  return await taskRepository.findById(id, user.id);
}
