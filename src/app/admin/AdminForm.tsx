"use client";

import { useActionState } from "react";
import { saveContent } from "./actions";
import ImageField from "@/components/admin/ImageField";
import type { SiteContent } from "@/lib/content/types";

export default function AdminForm({
  content,
  disabled,
}: {
  content: SiteContent;
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState(saveContent, {
    error: "",
    ok: false,
  });

  return (
    <form action={formAction} className="flex flex-col gap-10 pb-24">
      {/* HERO */}
      <Section title="Portada (Hero)">
        <Text name="hero.eyebrow" label="Bajada superior" defaultValue={content.hero.eyebrow} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="hero.title" label="Título" defaultValue={content.hero.title} />
          <Text
            name="hero.titleAccent"
            label="Título (parte en cursiva)"
            defaultValue={content.hero.titleAccent}
          />
        </div>
        <Area name="hero.subtitle" label="Subtítulo" defaultValue={content.hero.subtitle} />
        <ImageField
          name="hero.image"
          label="Imagen de portada"
          defaultValue={content.hero.image}
          disabled={disabled}
        />
      </Section>

      {/* SOBRE MI */}
      <Section title="Sobre Julieta">
        <Text name="about.eyebrow" label="Bajada superior" defaultValue={content.about.eyebrow} />
        <Text name="about.heading" label="Título" defaultValue={content.about.heading} />
        <Area
          name="about.paragraphs"
          label="Párrafos (uno por línea)"
          defaultValue={content.about.paragraphs.join("\n")}
          rows={5}
        />
        <Text name="about.quote" label="Frase destacada" defaultValue={content.about.quote} />
        <ImageField
          name="about.image"
          label="Imagen sección Sobre Julieta"
          defaultValue={content.about.image}
          disabled={disabled}
        />
      </Section>

      {/* SERVICIOS */}
      <Section title="Servicios">
        <Text
          name="services.eyebrow"
          label="Bajada superior"
          defaultValue={content.services.eyebrow}
        />
        <Text name="services.heading" label="Título" defaultValue={content.services.heading} />
        <Area
          name="services.subheading"
          label="Subtítulo"
          defaultValue={content.services.subheading}
        />
        {content.services.items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-[12px] border border-pardo/60 bg-white p-4"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-red-wine">
              Servicio {i + 1}
            </p>
            <Text
              name={`services.items.${i}.title`}
              label="Nombre"
              defaultValue={item.title}
            />
            <Text
              name={`services.items.${i}.tagline`}
              label="Subtítulo corto (etiqueta)"
              defaultValue={item.tagline}
            />
            <Area
              name={`services.items.${i}.description`}
              label="Descripción"
              defaultValue={item.description}
            />
            <Area
              name={`services.items.${i}.includes`}
              label="¿Qué incluye? (un ítem por línea)"
              defaultValue={item.includes.join("\n")}
              rows={5}
            />
            <Area
              name={`services.items.${i}.idealFor`}
              label="Ideal para vos si… (un ítem por línea)"
              defaultValue={item.idealFor.join("\n")}
              rows={3}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Text
                name={`services.items.${i}.ctaLabel`}
                label="Texto del botón"
                defaultValue={item.ctaLabel}
              />
              <Text
                name={`services.items.${i}.ctaHref`}
                label="Destino del botón (#contacto o un link)"
                defaultValue={item.ctaHref}
              />
            </div>
          </div>
        ))}
      </Section>

      {/* TESTIMONIOS */}
      <Section title="Testimonios">
        <Text
          name="testimonials.eyebrow"
          label="Bajada superior"
          defaultValue={content.testimonials.eyebrow}
        />
        <Text
          name="testimonials.heading"
          label="Título"
          defaultValue={content.testimonials.heading}
        />
        {content.testimonials.items.map((item, i) => (
          <div key={i} className="rounded-[12px] border border-pardo/60 bg-white p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-red-wine">
              Testimonio {i + 1}
            </p>
            <Area
              name={`testimonials.items.${i}.quote`}
              label="Texto"
              defaultValue={item.quote}
            />
            <Text
              name={`testimonials.items.${i}.author`}
              label="Autora"
              defaultValue={item.author}
            />
          </div>
        ))}
        <Text
          name="testimonials.note"
          label="Nota al pie (opcional)"
          defaultValue={content.testimonials.note}
        />
      </Section>

      {/* CONTACTO */}
      <Section title="Contacto">
        <Text name="contact.heading" label="Título" defaultValue={content.contact.heading} />
        <Area
          name="contact.description"
          label="Descripción"
          defaultValue={content.contact.description}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text
            name="contact.instagramHandle"
            label="Usuario de Instagram"
            defaultValue={content.contact.instagramHandle}
          />
          <Text
            name="contact.instagramUrl"
            label="URL de Instagram"
            defaultValue={content.contact.instagramUrl}
          />
          <Text name="contact.email" label="Email de contacto" defaultValue={content.contact.email} />
          <Text
            name="contact.phone"
            label="WhatsApp / Teléfono (opcional)"
            defaultValue={content.contact.phone}
          />
          <Text
            name="contact.youtubeUrl"
            label="URL de YouTube (vacío = no se muestra)"
            defaultValue={content.contact.youtubeUrl}
          />
          <Text
            name="contact.xUrl"
            label="URL de X (vacío = no se muestra)"
            defaultValue={content.contact.xUrl}
          />
          <Text
            name="contact.facebookUrl"
            label="URL de Facebook (vacío = no se muestra)"
            defaultValue={content.contact.facebookUrl}
          />
        </div>
      </Section>

      {/* FOOTER */}
      <Section title="Pie de página">
        <Text name="footer.copy" label="Texto de copyright" defaultValue={content.footer.copy} />
      </Section>

      {/* GUARDAR */}
      <div className="fixed inset-x-0 bottom-0 border-t border-bosque/10 bg-hueso/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <div className="text-sm">
            {state?.ok && <span className="font-semibold text-musgo">✓ Cambios guardados</span>}
            {state?.error && <span className="font-semibold text-red-wine">{state.error}</span>}
          </div>
          <button
            type="submit"
            disabled={pending || disabled}
            className="rounded-full bg-red-wine px-8 py-3 text-[15px] font-semibold text-hueso transition hover:bg-[#611c3b] disabled:opacity-50"
          >
            {pending ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[16px] border border-bosque/10 bg-hueso p-6">
      <h2 className="mb-5 font-heading text-lg uppercase text-bosque">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function Text({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold text-bosque">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="rounded-[10px] border border-pardo bg-white px-4 py-2.5 text-[15px] text-bosque focus:border-red-wine focus:outline-none"
      />
    </label>
  );
}

function Area({
  name,
  label,
  defaultValue,
  rows = 3,
}: {
  name: string;
  label: string;
  defaultValue: string;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold text-bosque">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="rounded-[10px] border border-pardo bg-white px-4 py-2.5 text-[15px] text-bosque focus:border-red-wine focus:outline-none"
      />
    </label>
  );
}
