"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { defaultContent } from "@/lib/content/default";
import { CONTENT_ROW_ID } from "@/lib/content/load";
import type { SiteContent } from "@/lib/content/types";

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
      items: defaultContent.services.items.map((item, i) => ({
        ...item,
        title: str(formData, `services.items.${i}.title`),
        tagline: str(formData, `services.items.${i}.tagline`) || item.tagline,
        description: str(formData, `services.items.${i}.description`),
        includes: lines(formData, `services.items.${i}.includes`, item.includes),
        idealFor: lines(formData, `services.items.${i}.idealFor`, item.idealFor),
        ctaLabel: str(formData, `services.items.${i}.ctaLabel`) || item.ctaLabel,
        ctaHref: str(formData, `services.items.${i}.ctaHref`) || item.ctaHref,
      })),
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

  revalidatePath("/");
  revalidatePath("/admin");
  return { error: "", ok: true };
}

function str(formData: FormData, key: string): string {
  return ((formData.get(key) as string) ?? "").trim();
}

function lines(formData: FormData, key: string, fallback: string[]): string[] {
  const raw = (formData.get(key) as string) ?? "";
  const parsed = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : fallback;
}
