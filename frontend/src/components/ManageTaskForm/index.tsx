"use client";

import { EditIcon, PlusIcon } from "lucide-react";
import { Button } from "../Button";
import InputDropdown from "../InputDropdown";
import { InputText } from "../InputText";
import { InputTextArea } from "../InputTextArea";
import { useActionState, useEffect, useState } from "react";
import { Priority } from "@/models/task/task-model";
import { makePartialTask } from "@/dto/task/dto";
import { createTaskAction } from "@/actions/create-task-action";
import { toast } from "react-toastify";

type Task = {
  id: string;
  title: string;
  content: string;
  priority: Priority;
};

type ManageTaskFormProps = {
  task?: Task;
};

export default function ManageTaskForm({ task }: ManageTaskFormProps) {
  const initialState = {
    formState: makePartialTask(task),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    createTaskAction,
    initialState
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state.errors]);

  const [priority, setPriority] = useState(task?.priority ?? "Normal");

  return (
    <form action={action} className="flex flex-col gap-4 py-4 p-1 sm:px-8">
      <InputText
        labelText="Título:"
        name="title"
        placeholder="Digite o título da tarefa"
        defaultValue={task?.title}
      />

      <InputTextArea
        labelText="Conteúdo:"
        name="content"
        placeholder="Digite o conteúdo da tarefa"
        defaultValue={task?.content}
      />

      <InputDropdown
        labelText="Nível"
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="w-48 hover:cursor-pointer"
      >
        <option value="Eventual">Eventual</option>
        <option value="Normal">Normal</option>
        <option value="Urgente">Urgente</option>
      </InputDropdown>

      <Button type="submit" variant="default" sizes="md" className="mt-4 w-fit">
        {task ? (
          <>
            <EditIcon /> Atualizar tarefa
          </>
        ) : (
          <>
            <PlusIcon /> Criar tarefa
          </>
        )}
      </Button>
    </form>
  );
}
