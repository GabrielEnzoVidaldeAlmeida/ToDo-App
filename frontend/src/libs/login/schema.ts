import z from "zod";

export const LoginSchema = z.object({
  name: z.string().trim().min(1, "Nome de usuário é obrigatório"),
  password: z
    .string()
    .trim()
    .min(3, "Senha precisa ter um mínimo de 3 caracteres"),
});
