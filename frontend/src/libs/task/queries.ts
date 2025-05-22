import { taskRepository } from "@/repositories/task";
import { cache } from "react";

export const findAllTasksCached = cache(
  async () => await taskRepository.findAll()
);

export const findTasksPending = cache(
  async () => await taskRepository.findPending()
);

export const findTasksDone = cache(async () => await taskRepository.findDone());
