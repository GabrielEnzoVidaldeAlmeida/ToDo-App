"use server";

import { CreateTask, makePartialTask } from "@/dto/task/dto";
import { getCurrentUser } from "@/libs/login/manage-login";
import { TaskCreateSchema } from "@/libs/task/validation";
import { TaskModel } from "@/models/task/task-model";
import { taskRepository } from "@/repositories/task";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { logColor } from "@/utils/log-color";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidV4 } from "uuid";

type CreateTaskActionState = {
  formState: CreateTask;
  errors: string[];
  success?: true;
};

export async function createTaskAction(
  prevState: CreateTaskActionState,
  formData: FormData
): Promise<CreateTaskActionState> {
  //TODO: Verificar se o usuário está logado
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      formState: prevState.formState,
      errors: ["Você precisa estar logado para criar uma tarefa"],
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  logColor("CREATE");

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
    userId: currentUser.id,
  };

  try {
    await taskRepository.create(newTask, currentUser.id);
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
