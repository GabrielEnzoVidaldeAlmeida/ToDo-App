import { InputText } from "@/components/InputText";

export default function NewTaskPage() {
  return (
    <div className="py-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
        Criar tarefa
      </h2>
      <div className="flex flex-col gap-4 py-4 p-1 sm:px-8">
        <InputText
          labelText="Título:"
          placeholder="Digite o título da tarefa"
        />

        <InputText
          labelText="Conteúdo:"
          placeholder="Digite o conteúdo da tarefa"
        />
      </div>
    </div>
  );
}
