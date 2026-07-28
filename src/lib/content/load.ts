import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { defaultContent } from "./default";
import type { SiteContent } from "./types";

const CONTENT_ROW_ID = "landing";

/**
 * Carga el contenido del sitio desde Supabase (tabla `site_content`, columna
 * jsonb `data`). Si Supabase no está configurado o no hay fila todavía,
 * devuelve el contenido por defecto para que la landing nunca quede vacía.
 */
export async function loadContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured()) {
    return defaultContent;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", CONTENT_ROW_ID)
      .maybeSingle();

    if (error || !data?.data) {
      return defaultContent;
    }

    // Merge superficial por sección para tolerar contenido parcial guardado.
    const stored = data.data as Partial<SiteContent>;
    return {
      hero: { ...defaultContent.hero, ...stored.hero },
      about: { ...defaultContent.about, ...stored.about },
      services: { ...defaultContent.services, ...stored.services },
      app: { ...defaultContent.app, ...stored.app },
      testimonials: { ...defaultContent.testimonials, ...stored.testimonials },
      contact: { ...defaultContent.contact, ...stored.contact },
      footer: { ...defaultContent.footer, ...stored.footer },
    };
  } catch {
    return defaultContent;
  }
}

export { CONTENT_ROW_ID };
