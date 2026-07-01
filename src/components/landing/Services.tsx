"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content/types";
import Reveal from "./Reveal";

type Theme = SiteContent["services"]["items"][number]["theme"];

const themeStyles: Record<
  Theme,
  { panel: string; body: string; chip: string; check: string; tabActive: string }
> = {
  bosque: {
    panel: "bg-bosque text-hueso",
    body: "text-hueso/85",
    chip: "bg-musgo/20 text-musgo",
    check: "text-musgo",
    tabActive: "bg-bosque text-hueso",
  },
  orquidea: {
    panel: "bg-orquidea text-red-wine",
    body: "text-red-wine/90",
    chip: "bg-red-wine/10 text-red-wine",
    check: "text-red-wine",
    tabActive: "bg-orquidea text-red-wine",
  },
  musgo: {
    panel: "bg-musgo text-bosque",
    body: "text-bosque/85",
    chip: "bg-bosque/10 text-bosque",
    check: "text-bosque",
    tabActive: "bg-musgo text-bosque",
  },
};

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={`mt-0.5 h-5 w-5 shrink-0 ${className}`}
    >
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Services({
  content,
}: {
  content: SiteContent["services"];
}) {
  const [active, setActive] = useState(0);
  const items = content.items;
  const current = items[active];
  const st = themeStyles[current.theme];

  const handleCta = (href: string, title: string) => {
    if (href === "#contacto") {
      const select = document.getElementById("service") as HTMLSelectElement | null;
      if (select) select.value = title;
      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
      document.getElementById("name")?.focus({ preventScroll: true });
    } else {
      window.open(href, "_blank", "noopener");
    }
  };

  return (
    <section id="servicios" className="bg-white py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal from="up">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.12em] text-red-wine">
            {content.eyebrow}
          </p>
          <h2 className="text-center text-[clamp(30px,4vw,44px)] uppercase">
            {content.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-bosque/70">
            {content.subheading}
          </p>
        </Reveal>

        {/* Pestañas */}
        <Reveal from="up" delay={100}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {items.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 rounded-full border-2 px-5 py-3 text-[15px] font-semibold transition-all duration-300 ${
                    isActive
                      ? `${themeStyles[s.theme].tabActive} border-transparent shadow-lg shadow-bosque/10`
                      : "border-bosque/15 text-bosque hover:border-bosque/40"
                  }`}
                >
                  <span
                    className={`font-heading text-sm ${
                      isActive ? "opacity-80" : "text-red-wine"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  {s.title}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel de detalle */}
        <Reveal from="scale" delay={150}>
          <div
            key={active}
            className={`mt-8 grid gap-10 rounded-[28px] p-8 transition-colors duration-500 md:grid-cols-2 md:p-12 lg:p-14 ${st.panel} animate-[fadeIn_0.5s_ease]`}
          >
            {/* Columna izquierda: intro + CTA */}
            <div className="flex flex-col">
              <span
                className={`mb-4 w-fit rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-wide ${st.chip}`}
              >
                {current.tagline}
              </span>
              <h3 className="font-heading text-[clamp(26px,3.5vw,38px)] uppercase leading-tight">
                {current.title}
              </h3>
              <p className={`mt-4 text-[16px] leading-relaxed ${st.body}`}>
                {current.description}
              </p>

              <div className="mt-8">
                <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.12em] opacity-70">
                  Ideal para vos si…
                </p>
                <ul className="flex flex-col gap-2.5">
                  {current.idealFor.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[15px]">
                      <CheckIcon className={st.check} />
                      <span className={st.body}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleCta(current.ctaHref, current.title)}
                className="group mt-8 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-red-wine px-7 py-3.5 text-[15px] font-semibold text-hueso shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#611c3b]"
              >
                {current.ctaLabel}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            {/* Columna derecha: qué incluye */}
            <div className="rounded-[20px] bg-hueso/10 p-6 backdrop-blur-sm md:p-8">
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.12em] opacity-70">
                ¿Qué incluye?
              </p>
              <ul className="flex flex-col gap-4">
                {current.includes.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-snug">
                    <CheckIcon className={st.check} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
