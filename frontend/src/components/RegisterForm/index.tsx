"use client";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

import { LogInIcon } from "lucide-react";

import { InputText } from "../InputText";
import { Button } from "../Button";
import { registerAction } from "@/actions/login/register-action";
import Link from "next/link";

type RegisterFormState = {
  username: string;
  password: string;
  confirmPassword: string;
  error?: string;
};

export function RegisterForm() {
  const initialState: RegisterFormState = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [state, action, isPending] = useActionState(
    registerAction,
    initialState
  );

  useEffect(() => {
    if (state?.error) {
      toast.dismiss();
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="flex flex-col px-4 py-6">
      <form action={action} className="flex flex-col gap-4">
        <InputText
          type="text"
          name="username"
          labelText="Usuário"
          placeholder="Seu usuário..."
          disabled={isPending}
          defaultValue={state?.username}
        />

        <InputText
          type="password"
          name="password"
          labelText="Senha"
          placeholder="Sua senha..."
          disabled={isPending}
        />

        <InputText
          type="password"
          name="confirmPassword"
          labelText="Confirmar senha"
          placeholder="Repita sua senha..."
          disabled={isPending}
        />

        <Button type="submit" disabled={isPending} className="mt-6">
          <LogInIcon /> Registrar
        </Button>

        {!!state?.error && <p className="text-red-600">{state.error}</p>}
      </form>

      <div className="mt-4">
        <Link
          href="/login"
          className="underline hover:decoration-black hover:text-blue-600"
        >
          Já tem uma conta? Entre
        </Link>
      </div>
    </div>
  );
}
