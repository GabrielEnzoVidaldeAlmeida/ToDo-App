"use server";

import { createLoginSession, verifyPassword } from "@/libs/login/manage-login";
import { findUserByUsername } from "@/repositories/user/user-repository";
import { asyncDelay } from "@/utils/async-delay";
import { redirect } from "next/navigation";

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(
  state: LoginActionState | undefined,
  formData: FormData
) {
  await asyncDelay(1000); //TODO: Decidir se mantenho ou não

  if (!(formData instanceof FormData)) {
    return {
      username: "",
      error: "Dados inválidos",
    };
  }

  const username = formData.get("username")?.toString().trim() || "";
  const password = formData.get("password")?.toString().trim() || "";

  if (!username || !password) {
    return {
      username,
      error: "Digite o usuário e a senha",
    };
  }

  // const isUsernameValid = username === process.env.LOGIN_USER;
  // const isPasswordValid = await verifyPassword(
  //   password,
  //   process.env.LOGIN_PASS || ""
  // );

  const user = await findUserByUsername(username);
  if (!user) {
    return { username, error: "Usuário ou senha inválidos" };
  }

  const isPasswordValid = await verifyPassword(password, user.passwordHash);
  if (!isPasswordValid) {
    return { username, error: "Usuário ou senha inválidos" };
  }

  await createLoginSession({ id: user.id, username: user.name });
  redirect("/tasks/all");
}
