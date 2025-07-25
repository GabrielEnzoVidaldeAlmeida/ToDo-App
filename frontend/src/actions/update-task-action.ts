"use server";

import { CreateTask, makePartialTask, makeTask } from "@/dto/task/dto";
import { TaskUpdateSchema } from "@/libs/task/validation";
import { taskRepository } from "@/repositories/task";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidateTag } from "next/cache";

type UpdateTaskActionState = {
  formState: CreateTask;
  errors: string[];
  success?: true;
};

export async function updateTaskAction(
  prevState: UpdateTaskActionState,
  formData: FormData
): Promise<UpdateTaskActionState> {
  //TODO: Verificar se usuário está logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const id = formData.get("id")?.toString() || "";

  if (!id || typeof id !== "string") {
    return {
      formState: prevState.formState,
      errors: ["ID inválido"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = TaskUpdateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialTask(formDataToObj),
    };
  }

  const validTaskData = zodParsedObj.data;
  const newTask = {
    ...validTaskData,
  };

  let task;
  try {
    task = await taskRepository.update(id, newTask);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialTask(formDataToObj),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialTask(formDataToObj),
      errors: ["Error desconhecido"],
    };
  }

  revalidateTag("tasks");

  return {
    formState: makeTask(task),
    errors: [],
    success: true,
  };
}
