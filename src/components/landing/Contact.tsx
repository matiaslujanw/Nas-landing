"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content/types";
import Reveal from "./Reveal";
import SocialLinks from "./SocialLinks";

export default function Contact({
  content,
  serviceTitles,
}: {
  content: SiteContent["contact"];
  serviceTitles: string[];
}) {
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const service = data.get("service") as string;
    const message = (data.get("message") as string)?.trim();

    const subject = `Consulta NAS Fitness Lab — ${service}`;
    const body =
      `Nombre: ${name}\n` +
      `Email: ${email}\n` +
      `WhatsApp/Teléfono: ${phone || "-"}\n` +
      `Servicio de interés: ${service}\n\n` +
      `Mensaje:\n${message || "-"}`;

    window.location.href = `mailto:${content.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setNote(
      `Se abrió tu app de mail con la consulta cargada. Si no se abrió, escribinos directo a ${content.email}`
    );
  };

  return (
    <section id="contacto" className="bg-bosque py-24 text-hueso">
      <div className="mx-auto grid max-w-[1180px] gap-16 px-6 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal from="left">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-orquidea">
            Contacto
          </p>
          <h2 className="text-[clamp(30px,4vw,44px)] uppercase text-hueso">
            {content.heading}
          </h2>
          <p className="mt-4 max-w-[380px] text-hueso/80">{content.description}</p>

          <div className="mt-8 flex max-w-[400px] flex-col gap-3">
            <a
              href={`mailto:${content.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-hueso/10 bg-hueso/5 p-4 transition-all duration-300 hover:border-transparent hover:bg-hueso/10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orquidea/20 text-orquidea transition group-hover:bg-orquidea group-hover:text-bosque">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-musgo">
                  Email
                </span>
                <span className="text-[15px] text-hueso">{content.email}</span>
              </span>
            </a>

            {content.phone && (
              <a
                href={`https://wa.me/${content.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-4 rounded-2xl border border-hueso/10 bg-hueso/5 p-4 transition-all duration-300 hover:border-transparent hover:bg-hueso/10"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-musgo/20 text-musgo transition group-hover:bg-musgo group-hover:text-bosque">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2Zm5.5 14.1c-.23.65-1.35 1.24-1.86 1.28-.5.05-1.02.24-3.4-.71-2.87-1.13-4.7-4.05-4.84-4.24-.14-.19-1.16-1.54-1.16-2.94s.74-2.08 1-2.37c.26-.28.57-.35.76-.35l.55.01c.18.01.42-.07.65.5.23.57.79 1.96.86 2.1.07.14.12.3.02.5-.1.19-.14.3-.28.47-.14.16-.3.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.09 1.63.77 1.9.91.29.14.48.21.55.33.07.12.07.7-.16 1.35Z" />
                  </svg>
                </span>
                <span className="flex flex-col">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-musgo">
                    WhatsApp
                  </span>
                  <span className="text-[15px] text-hueso">{content.phone}</span>
                </span>
              </a>
            )}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-musgo">
              Seguime en redes
            </p>
            <SocialLinks contact={content} />
          </div>
        </Reveal>

        <Reveal from="right" delay={100} as="div">
        <form
          onSubmit={handleSubmit}
          className="rounded-[20px] bg-hueso p-6 text-bosque shadow-2xl shadow-black/20 md:p-10"
        >
          <Field label="Nombre completo" htmlFor="name">
            <input id="name" name="name" type="text" required className={inputCls} />
          </Field>
          <Field label="Email" htmlFor="email">
            <input id="email" name="email" type="email" required className={inputCls} />
          </Field>
          <Field label="WhatsApp / Teléfono" htmlFor="phone">
            <input id="phone" name="phone" type="tel" className={inputCls} />
          </Field>
          <Field label="Servicio de interés" htmlFor="service">
            <select id="service" name="service" required defaultValue="" className={inputCls}>
              <option value="" disabled>
                Elegí una opción
              </option>
              {serviceTitles.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
              <option value="No estoy segura / Quiero consultar">
                No estoy segura / Quiero consultar
              </option>
            </select>
          </Field>
          <Field label="Contame un poco más" htmlFor="message">
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="¿Cuál es tu objetivo? ¿Alguna vez entrenaste antes?"
              className={inputCls}
            />
          </Field>
          <button
            type="submit"
            className="w-full rounded-full bg-red-wine px-7 py-3.5 text-[15px] font-semibold text-hueso transition hover:bg-[#611c3b]"
          >
            Enviar consulta
          </button>
          {note && (
            <p className="mt-4 text-sm font-semibold text-red-wine" role="status">
              {note}
            </p>
          )}
        </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "rounded-[10px] border border-pardo bg-white px-4 py-3 text-[15px] text-bosque focus:border-red-wine focus:outline-none";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[13px] font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}
