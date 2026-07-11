"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { defaultContent } from "@/lib/content/default";
import { CONTENT_ROW_ID } from "@/lib/content/load";
import type { ServiceItem, SiteContent } from "@/lib/content/types";

export async function login(_prev: unknown, formData: FormData) {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase no está configurado todavía (faltan variables de entorno)." };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email o contraseña incorrectos." };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveContent(_prev: unknown, formData: FormData) {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase no está configurado todavía.", ok: false };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Sesión expirada. Volvé a iniciar sesión.", ok: false };
  }

  const content: SiteContent = {
    hero: {
      ...defaultContent.hero,
      eyebrow: str(formData, "hero.eyebrow"),
      title: str(formData, "hero.title"),
      titleAccent: str(formData, "hero.titleAccent"),
      subtitle: str(formData, "hero.subtitle"),
      image: str(formData, "hero.image") || defaultContent.hero.image,
    },
    about: {
      ...defaultContent.about,
      eyebrow: str(formData, "about.eyebrow"),
      heading: str(formData, "about.heading"),
      paragraphs: str(formData, "about.paragraphs")
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
      quote: str(formData, "about.quote"),
      image: str(formData, "about.image") || defaultContent.about.image,
    },
    services: {
      ...defaultContent.services,
      eyebrow: str(formData, "services.eyebrow"),
      heading: str(formData, "services.heading"),
      subheading: str(formData, "services.subheading"),
      items: parseServices(formData),
    },
    testimonials: {
      ...defaultContent.testimonials,
      eyebrow: str(formData, "testimonials.eyebrow"),
      heading: str(formData, "testimonials.heading"),
      note: str(formData, "testimonials.note"),
      items: defaultContent.testimonials.items.map((item, i) => ({
        quote: str(formData, `testimonials.items.${i}.quote`),
        author: str(formData, `testimonials.items.${i}.author`) || item.author,
      })),
    },
    contact: {
      ...defaultContent.contact,
      heading: str(formData, "contact.heading"),
      description: str(formData, "contact.description"),
      instagramHandle: str(formData, "contact.instagramHandle"),
      instagramUrl: str(formData, "contact.instagramUrl"),
      email: str(formData, "contact.email"),
      phone: str(formData, "contact.phone"),
      youtubeUrl: str(formData, "contact.youtubeUrl"),
      xUrl: str(formData, "contact.xUrl"),
      facebookUrl: str(formData, "contact.facebookUrl"),
    },
    footer: {
      copy: str(formData, "footer.copy"),
    },
  };

  const { error } = await supabase
    .from("site_content")
    .upsert({ id: CONTENT_ROW_ID, data: content, updated_at: new Date().toISOString() });

  if (error) {
    return { error: `No se pudo guardar: ${error.message}`, ok: false };
  }

  // Revalidamos la landing pública y también /admin: al volver contenido fresco,
  // el formulario se re-siembra desde la DB (ver la `key` en AdminForm). Esto
  // evita que React 19, al resetear el form tras la action, deje los inputs con
  // los valores del cargado inicial (lo que hacía "volver a lo anterior" y que
  // un segundo guardado pisara al primero con datos viejos).
  revalidatePath("/");
  revalidatePath("/admin");
  return { error: "", ok: true };
}

const SERVICE_THEMES = ["bosque", "orquidea", "musgo"] as const;
type ServiceTheme = (typeof SERVICE_THEMES)[number];

/**
 * Reconstruye la lista de servicios desde el FormData. El admin envía cuántos
 * hay en `services.count`, así Julieta puede agregar o eliminar servicios sin
 * quedar atada a la cantidad por defecto. Los servicios sin nombre se descartan.
 */
function parseServices(formData: FormData): ServiceItem[] {
  const count = Number(formData.get("services.count") ?? 0);
  const items: ServiceItem[] = [];

  for (let i = 0; i < count; i++) {
    const title = str(formData, `services.items.${i}.title`);
    if (!title) continue;

    const themeRaw = str(formData, `services.items.${i}.theme`);
    const theme: ServiceTheme = (SERVICE_THEMES as readonly string[]).includes(themeRaw)
      ? (themeRaw as ServiceTheme)
      : "bosque";

    items.push({
      title,
      tagline: str(formData, `services.items.${i}.tagline`),
      description: str(formData, `services.items.${i}.description`),
      includes: lines(formData, `services.items.${i}.includes`),
      idealFor: lines(formData, `services.items.${i}.idealFor`),
      ctaLabel: str(formData, `services.items.${i}.ctaLabel`) || "Quiero sumarme",
      ctaHref: str(formData, `services.items.${i}.ctaHref`) || "#contacto",
      theme,
    });
  }

  return items;
}

function str(formData: FormData, key: string): string {
  return ((formData.get(key) as string) ?? "").trim();
}

function lines(formData: FormData, key: string): string[] {
  return ((formData.get(key) as string) ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
