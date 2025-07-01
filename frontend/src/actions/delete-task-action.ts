"use server";

import { asyncDelay } from "@/utils/async-delay";
import { logColor } from "@/utils/log-color";

export async function deleteTaskAction(id: string) {
  await asyncDelay(2000);
  logColor("" + id);
}
