"use client";

import { loginAction } from "@/actions/login/login-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { InputText } from "../InputText";
import { Button } from "../Button";
import { LogInIcon } from "lucide-react";

export function LoginForm() {
  const initialState = {
    username: "",
    error: "",
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

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
          placeholder="Sua senha"
          disabled={isPending}
        />

        <Button disabled={isPending} type="submit" className="mt-6">
          <LogInIcon />
          Entrar
        </Button>

        {!!state?.error && <p className="text-red-600">{state.error}</p>}
      </form>
    </div>
  );
}
