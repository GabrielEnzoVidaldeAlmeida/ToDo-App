"use server";

import { CreateTask, makePartialTask } from "@/dto/task/dto";
import { TaskCreateSchema } from "@/libs/task/validation";
import { TaskModel } from "@/models/task/task-model";
import { taskRepository } from "@/repositories/task";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidV4 } from "uuid";

type CreateTaskActionState = {
  formState: CreateTask;
  errors: string[];
};

export async function createTaskAction(
  prevState: CreateTaskActionState,
  formData: FormData
): Promise<CreateTaskActionState> {
  //TODO: Verificar se o usuário está logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = TaskCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialTask(formDataToObj),
    };
  }

  const validTaskData = zodParsedObj.data;
  const newTask: TaskModel = {
    ...validTaskData,
    createdAt: new Date().toISOString(),
    done: false,
    id: uuidV4(),
  };

  try {
    await taskRepository.create(newTask);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newTask,
        errors: [e.message],
      };
    }

    return {
      formState: newTask,
      errors: ["Erro desconhecido"],
    };
  }

  revalidateTag("tasks");
  redirect("/tasks/pending?created=1");
}
