import { drizzleDb } from "@/db/drizzle";
import { NewUser, usersTable } from "@/db/drizzle/schemas";
import { eq } from "drizzle-orm";

export async function createUser(newUser: NewUser) {
  await drizzleDb.insert(usersTable).values(newUser);
}

export async function findUserByUsername(username: string) {
  return drizzleDb.query.users.findFirst({
    where: eq(usersTable.name, username),
  });
}
