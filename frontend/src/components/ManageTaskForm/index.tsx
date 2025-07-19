"use client";

import { EditIcon, PlusIcon } from "lucide-react";
import { Button } from "../Button";
import InputDropdown from "../InputDropdown";
import { InputText } from "../InputText";
import { InputTextArea } from "../InputTextArea";
import { useState } from "react";
import { Priority } from "@/models/task/task-model";

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
  const [priority, setPriority] = useState(task?.priority ?? "Normal");

  return (
    <form className="flex flex-col gap-4 py-4 p-1 sm:px-8">
      <InputText
        labelText="Título:"
        placeholder="Digite o título da tarefa"
        defaultValue={task?.title}
      />

      <InputTextArea
        labelText="Conteúdo:"
        placeholder="Digite o conteúdo da tarefa"
        defaultValue={task?.content}
      />

      <InputDropdown
        labelText="Nível"
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
