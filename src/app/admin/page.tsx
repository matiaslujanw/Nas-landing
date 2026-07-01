import { isSupabaseConfigured } from "@/lib/supabase/server";
import { loadContent } from "@/lib/content/load";
import { logout } from "./actions";
import AdminForm from "./AdminForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = isSupabaseConfigured();
  const content = await loadContent();

  return (
    <div className="min-h-screen bg-hueso">
      <header className="sticky top-0 z-10 border-b border-bosque/10 bg-hueso/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex flex-col leading-none">
            <span className="font-heading text-lg font-black text-bosque">NAS</span>
            <span className="mt-0.5 text-[8px] font-medium tracking-[0.28em] text-red-wine">
              ADMIN
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-sm font-semibold hover:text-red-wine">
              Ver página ↗
            </a>
            <form action={logout}>
              <button className="rounded-full border-2 border-red-wine px-4 py-2 text-sm font-semibold text-red-wine transition hover:bg-red-wine hover:text-hueso">
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-1 font-heading text-2xl uppercase text-bosque">
          Editar contenido
        </h1>
        <p className="mb-8 text-sm text-bosque/60">
          Cambiá los textos, imágenes y datos de contacto. Los cambios se publican al guardar.
        </p>

        {!configured && (
          <div className="mb-8 rounded-[14px] border border-red-wine/30 bg-orquidea/20 p-5 text-sm text-red-wine">
            <strong>Falta conectar Supabase.</strong> Configurá las variables{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para poder guardar cambios. Por
            ahora ves el contenido por defecto.
          </div>
        )}

        <AdminForm content={content} disabled={!configured} />
      </main>
    </div>
  );
}
