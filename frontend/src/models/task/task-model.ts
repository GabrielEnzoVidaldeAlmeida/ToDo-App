export type Priority = "baixa" | "média" | "alta";

export type TaskModel = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  priority: Priority;
};
