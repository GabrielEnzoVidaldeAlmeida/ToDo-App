"use client";

import { deleteTaskAction } from "@/actions/delete-task-action";
import { useTransition } from "react";
import { Button } from "../Button";
import { TrashIcon } from "lucide-react";

type TaskDeleteButtonProps = {
  id: string;
};

export function TaskDeleteButton({ id }: TaskDeleteButtonProps) {
  const [isDeleting, startTransition] = useTransition();

  const deleteTask = () => {
    startTransition(() => {
      deleteTaskAction(id);
    });
  };

  return (
    <Button
      variant="icon"
      sizes="icon"
      onClick={deleteTask}
      disabled={isDeleting}
      aria-label="Deletar tarefa?"
      title="Deletar tarefa?"
      className={`${isDeleting ? "animate-pulse" : ""}`}
    >
      <TrashIcon className="stroke-red-800 hover:scale-105" />
    </Button>
  );
}
