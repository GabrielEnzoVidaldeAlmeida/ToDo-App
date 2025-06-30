"use server";

import { drizzleDb } from "@/db/drizzle";
import { tasksTable } from "@/db/drizzle/schemas";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function toogleTaskStatus(id: string, currentDone: boolean) {
  await drizzleDb
    .update(tasksTable)
    .set({ done: !currentDone })
    .where(eq(tasksTable.id, id));

  revalidateTag("tasks");
}
