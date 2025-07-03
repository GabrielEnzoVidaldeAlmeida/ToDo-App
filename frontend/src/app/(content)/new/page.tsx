//TODO: Remover use client
"use client";

import InputDropdown from "@/components/InputDropdown";
import { InputText } from "@/components/InputText";
import { InputTextArea } from "@/components/InputTextArea";
import { useState } from "react";

export default function NewTaskPage() {
  //TODO: criar um componente para mover esse hook
  const [priority, setPriority] = useState("Normal");

  return (
    //TODO: Criar um componente para mover esse formulário

    <div className="py-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
        Criar tarefa
      </h2>
      <div className="flex flex-col gap-4 py-4 p-1 sm:px-8">
        <InputText
          labelText="Título:"
          placeholder="Digite o título da tarefa"
        />

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
      </div>
    </div>
  );
}
