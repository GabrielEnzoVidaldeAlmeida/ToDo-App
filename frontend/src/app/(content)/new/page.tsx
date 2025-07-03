import ManageTaskForm from "@/components/ManageTaskForm";

export default function NewTaskPage() {
  //TODO: criar um componente para mover esse hook

  return (
    //TODO: Criar um componente para mover esse formulário
    <div className="py-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
        Criar tarefa
      </h2>

      <ManageTaskForm />
    </div>
  );
}
