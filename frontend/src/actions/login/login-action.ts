import { asyncDelay } from "@/utils/async-delay";

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(
  state: LoginActionState | undefined,
  formData: FormData
): Promise<LoginActionState | undefined> {
  await asyncDelay(5000); //TODO: Decidir se mantenho ou não

  if (!(formData instanceof FormData)) {
    return {
      username: "",
      error: "Dados inválidos",
    };
  }
}
