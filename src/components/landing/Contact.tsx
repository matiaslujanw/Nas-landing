"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content/types";
import Reveal from "./Reveal";

export default function Contact({
  content,
}: {
  content: SiteContent["contact"];
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

          <ul className="mt-8 max-w-[380px] list-none p-0">
            <li className="flex justify-between border-b border-hueso/15 py-4">
              <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-musgo">
                Instagram
              </span>
              <a
                href={content.instagramUrl}
                target="_blank"
                rel="noopener"
                className="hover:text-orquidea"
              >
                {content.instagramHandle}
              </a>
            </li>
            {content.phone && (
              <li className="flex justify-between border-b border-hueso/15 py-4">
                <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-musgo">
                  WhatsApp
                </span>
                <a
                  href={`https://wa.me/${content.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-orquidea"
                >
                  {content.phone}
                </a>
              </li>
            )}
            <li className="flex justify-between border-b border-hueso/15 py-4">
              <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-musgo">
                Email
              </span>
              <a href={`mailto:${content.email}`} className="hover:text-orquidea">
                {content.email}
              </a>
            </li>
          </ul>
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
              <option value="Coaching 1:1">Coaching 1:1</option>
              <option value="Entrenamiento">Entrenamiento</option>
              <option value="Nutrición">Nutrición</option>
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
