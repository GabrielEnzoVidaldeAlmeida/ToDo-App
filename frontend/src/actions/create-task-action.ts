"use server";

import { CreateTask } from "@/dto/task/dto";

type CreateTaskActionState = {
  formState: CreateTask;
  errors: string[];
};

export async function createTaskAction(
  prevState: CreateTaskActionState,
  formData: FormData
): Promise<CreateTaskActionState> {}
