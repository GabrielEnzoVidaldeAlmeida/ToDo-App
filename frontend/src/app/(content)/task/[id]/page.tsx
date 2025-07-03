import ManageTaskForm from "@/components/ManageTaskForm";
import { findByIdTask } from "@/libs/task/queries";
import { notFound } from "next/navigation";

type UpdateTaskPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UpdateTaskPage({ params }: UpdateTaskPageProps) {
  const { id } = await params;
  const task = await findByIdTask(id).catch();

  if (!task) notFound();

  return (
    <div className="py-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
        Atualizar tarefa
      </h2>

      <ManageTaskForm task={task} />
    </div>
  );
}
