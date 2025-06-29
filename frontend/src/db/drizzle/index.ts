import { resolve } from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { tasksTable } from "./schemas";

const sqlite3DatabasePath = resolve(process.cwd(), "db.sqlite3");
const sqlite3Database = new Database(sqlite3DatabasePath);

export const drizzleDb = drizzle(sqlite3Database, {
  schema: {
    tasks: tasksTable,
  },
  logger: false,
});
