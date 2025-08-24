import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: text("created_at").notNull(),
});

export type User = InferSelectModel<typeof usersTable>;
export type NewUser = InferInsertModel<typeof usersTable>;

export const tasksTable = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(),
  priority: text("priority").notNull(),
  done: integer("done", { mode: "boolean" }).notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
});

export type TasksTableSelectMode = InferSelectModel<typeof tasksTable>;
export type TasksTableInsertMode = InferInsertModel<typeof tasksTable>;
