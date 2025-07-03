"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../Button";
import InputDropdown from "../InputDropdown";
import { InputText } from "../InputText";
import { InputTextArea } from "../InputTextArea";
import { useState } from "react";

export default function ManageTaskForm() {
  const [priority, setPriority] = useState("Normal");

  return (
    <form className="flex flex-col gap-4 py-4 p-1 sm:px-8">
      <InputText labelText="Título:" placeholder="Digite o título da tarefa" />

      <InputTextArea
        labelText="Conteúdo:"
        placeholder="Digite o conteúdo da tarefa"
      />

      <InputDropdown
        labelText="Nível"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-48"
      >
        <option value="Eventual">Eventual</option>
        <option value="Normal">Normal</option>
        <option value="Urgente">Urgente</option>
      </InputDropdown>

      <Button type="submit" variant="default" sizes="md" className="mt-4 w-fit">
        <PlusIcon />
        Criar tarefa
      </Button>
    </form>
  );
}
