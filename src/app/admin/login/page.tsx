"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, { error: "" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-bosque px-6">
      <div className="w-full max-w-sm rounded-[20px] bg-hueso p-8">
        <div className="mb-6 flex flex-col leading-none">
          <span className="font-heading text-[26px] font-black text-bosque">NAS</span>
          <span className="mt-1 text-[9px] font-medium tracking-[0.28em] text-red-wine">
            FITNESS LAB · ADMIN
          </span>
        </div>

        <h1 className="mb-1 font-heading text-xl uppercase text-bosque">Iniciar sesión</h1>
        <p className="mb-6 text-sm text-bosque/60">
          Panel de gestión de contenido de la página.
        </p>

        <form action={formAction} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-[13px] font-semibold text-bosque">
            Email
            <input
              name="email"
              type="email"
              required
              className="rounded-[10px] border border-pardo bg-white px-4 py-3 text-[15px] text-bosque focus:border-red-wine focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-[13px] font-semibold text-bosque">
            Contraseña
            <input
              name="password"
              type="password"
              required
              className="rounded-[10px] border border-pardo bg-white px-4 py-3 text-[15px] text-bosque focus:border-red-wine focus:outline-none"
            />
          </label>

          {state?.error && (
            <p className="text-sm font-semibold text-red-wine">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-full bg-red-wine px-7 py-3.5 text-[15px] font-semibold text-hueso transition hover:bg-[#611c3b] disabled:opacity-60"
          >
            {pending ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
