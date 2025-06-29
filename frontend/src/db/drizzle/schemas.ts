import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(),
  priority: text("priority").notNull(),
  done: integer("done", { mode: "boolean" }).notNull(),
});

export type TasksTableSelectMode = InferSelectModel<typeof tasksTable>;
export type TasksTableInsertMode = InferInsertModel<typeof tasksTable>;
