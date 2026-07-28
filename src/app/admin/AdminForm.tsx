"use client";

import { useActionState, useRef, useState } from "react";
import { saveContent } from "./actions";
import ImageField from "@/components/admin/ImageField";
import MediaField from "@/components/admin/MediaField";
import type { AppMediaItem, ServiceItem, SiteContent } from "@/lib/content/types";

type ServiceDraft = ServiceItem & { uid: string };
type MediaDraft = AppMediaItem & { uid: string };

const BLANK_MEDIA: AppMediaItem = { src: "", poster: "", alt: "" };

const THEME_OPTIONS = [
  { value: "bosque", label: "Verde bosque" },
  { value: "orquidea", label: "Rosa orquídea" },
  { value: "musgo", label: "Verde musgo" },
];

const BLANK_SERVICE: ServiceItem = {
  title: "",
  tagline: "",
  description: "",
  includes: [],
  idealFor: [],
  ctaLabel: "Quiero sumarme",
  ctaHref: "#contacto",
  theme: "bosque",
};

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

  // El contenedor con `useActionState` y la barra de guardado quedan siempre
  // montados (así el "✓ Cambios guardados" sobrevive). Los campos se remontan
  // vía `key` cuando un guardado revalida /admin y trae contenido fresco: así
  // todos los inputs no-controlados re-leen su valor desde la DB y no quedan
  // con los valores del cargado inicial tras el reset automático de React 19.
  return (
    <form action={formAction} className="flex flex-col gap-10 pb-24">
      <Fields key={JSON.stringify(content)} content={content} disabled={disabled} />

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

function Fields({ content, disabled }: { content: SiteContent; disabled?: boolean }) {
  // Lista de servicios editable: se puede agregar y eliminar. Las inputs son
  // no-controladas (defaultValue); el `uid` como key preserva lo tipeado al
  // reordenar/eliminar, y el `name` por índice es lo que lee el server action.
  const uidRef = useRef(content.services.items.length);
  const [services, setServices] = useState<ServiceDraft[]>(() =>
    content.services.items.map((it, i) => ({ ...it, uid: `svc-${i}` }))
  );

  const addService = () =>
    setServices((s) => [...s, { ...BLANK_SERVICE, uid: `svc-${uidRef.current++}` }]);
  const removeService = (uid: string) =>
    setServices((s) => s.filter((x) => x.uid !== uid));

  // Mismo esquema para los celulares de la sección App.
  const mediaUidRef = useRef(content.app.media.length);
  const [appMedia, setAppMedia] = useState<MediaDraft[]>(() =>
    content.app.media.map((m, i) => ({ ...m, uid: `media-${i}` }))
  );

  const addMedia = () =>
    setAppMedia((m) => [...m, { ...BLANK_MEDIA, uid: `media-${mediaUidRef.current++}` }]);
  const removeMedia = (uid: string) =>
    setAppMedia((m) => m.filter((x) => x.uid !== uid));

  return (
    <>
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

        <input type="hidden" name="services.count" value={services.length} readOnly />

        {services.map((item, i) => (
          <div
            key={item.uid}
            className="overflow-hidden rounded-2xl border-2 border-bosque/15 bg-white shadow-md shadow-bosque/5"
          >
            <div className="flex items-center justify-between bg-bosque px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-wine text-sm font-bold text-hueso">
                  {i + 1}
                </span>
                <span className="font-heading text-sm uppercase tracking-wide text-hueso">
                  {item.title || "Servicio nuevo"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeService(item.uid)}
                className="rounded-full border border-hueso/40 px-3 py-1 text-xs font-semibold text-hueso transition hover:bg-hueso hover:text-bosque"
              >
                Eliminar
              </button>
            </div>
            <div className="flex flex-col gap-4 p-5">
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
              <Select
                name={`services.items.${i}.theme`}
                label="Color de la tarjeta"
                defaultValue={item.theme}
                options={THEME_OPTIONS}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addService}
          className="w-fit rounded-full border-2 border-dashed border-red-wine/50 px-5 py-2.5 text-sm font-semibold text-red-wine transition hover:border-solid hover:bg-red-wine hover:text-hueso"
        >
          + Agregar servicio
        </button>
      </Section>

      {/* APP */}
      <Section title="Sección App">
        <Text name="app.heading" label="Título" defaultValue={content.app.heading} />
        <Area
          name="app.subheading"
          label="Subtítulo"
          defaultValue={content.app.subheading}
        />
        <Area
          name="app.bullets"
          label="Lista de beneficios (uno por línea)"
          defaultValue={content.app.bullets.join("\n")}
          rows={7}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text
            name="app.ctaLabel"
            label="Texto del botón"
            defaultValue={content.app.ctaLabel}
          />
          <Text
            name="app.ctaHref"
            label="Destino del botón (#contacto o un link)"
            defaultValue={content.app.ctaHref}
          />
        </div>

        <input type="hidden" name="app.media.count" value={appMedia.length} readOnly />

        {appMedia.map((item, i) => (
          <div
            key={item.uid}
            className="overflow-hidden rounded-2xl border-2 border-bosque/15 bg-white shadow-md shadow-bosque/5"
          >
            <div className="flex items-center justify-between bg-bosque px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-wine text-sm font-bold text-hueso">
                  {i + 1}
                </span>
                <span className="font-heading text-sm uppercase tracking-wide text-hueso">
                  Celular {i + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeMedia(item.uid)}
                className="rounded-full border border-hueso/40 px-3 py-1 text-xs font-semibold text-hueso transition hover:bg-hueso hover:text-bosque"
              >
                Eliminar
              </button>
            </div>
            <div className="flex flex-col gap-4 p-5">
              <MediaField
                name={`app.media.${i}.src`}
                label="Video o imagen"
                hint="Grabación de pantalla (MP4/MOV) o captura (JPG/PNG/GIF). Vertical, hasta 45 MB. El video se reproduce solo, en loop y sin sonido."
                defaultValue={item.src}
                disabled={disabled}
              />
              <Text
                name={`app.media.${i}.alt`}
                label="Descripción (accesibilidad)"
                defaultValue={item.alt}
              />
              <input
                type="hidden"
                name={`app.media.${i}.poster`}
                defaultValue={item.poster}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addMedia}
          className="w-fit rounded-full border-2 border-dashed border-red-wine/50 px-5 py-2.5 text-sm font-semibold text-red-wine transition hover:border-solid hover:bg-red-wine hover:text-hueso"
        >
          + Agregar celular
        </button>
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
          <div
            key={i}
            className="overflow-hidden rounded-2xl border-2 border-bosque/15 bg-white shadow-md shadow-bosque/5"
          >
            <div className="flex items-center gap-3 bg-bosque px-4 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-wine text-sm font-bold text-hueso">
                {i + 1}
              </span>
              <span className="font-heading text-sm uppercase tracking-wide text-hueso">
                Testimonio {i + 1}
              </span>
            </div>
            <div className="flex flex-col gap-4 p-5">
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
    </>
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

function Select({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-semibold text-bosque">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="rounded-[10px] border border-pardo bg-white px-4 py-2.5 text-[15px] text-bosque focus:border-red-wine focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
