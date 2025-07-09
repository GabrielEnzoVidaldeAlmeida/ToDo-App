import { taskRepository } from "@/repositories/task";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const findAllTasksCached = cache(
  unstable_cache(
    async () => {
      return await taskRepository.findAll();
    },
    ["tasks"],
    {
      tags: ["tasks"],
    }
  )
);

export const findTasksPending = cache(
  unstable_cache(
    async () => {
      return await taskRepository.findPending();
    },
    ["tasks"],
    {
      tags: ["tasks"],
    }
  )
);

// export const findTasksPending = cache(
//   async () => await taskRepository.findPending()
// );

export const findTasksDone = cache(
  unstable_cache(
    async () => {
      return await taskRepository.findDone();
    },
    ["tasks"],
    {
      tags: ["tasks"],
    }
  )
);

// export const findTasksDone = cache(async () => await taskRepository.findDone());

export const findByIdTask = cache((id: string) =>
  unstable_cache(() => taskRepository.findById(id), [`task-${id}`], {
    tags: ["tasks"],
  })()
);
