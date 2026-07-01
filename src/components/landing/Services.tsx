"use client";

import type { SiteContent } from "@/lib/content/types";
import Reveal from "./Reveal";

const themeStyles: Record<
  SiteContent["services"]["items"][number]["theme"],
  { card: string; body: string; button: string; num: string }
> = {
  bosque: {
    card: "bg-bosque text-hueso",
    body: "text-hueso/85",
    button: "border-hueso text-hueso hover:bg-hueso hover:text-bosque",
    num: "text-musgo/40",
  },
  orquidea: {
    card: "bg-orquidea text-red-wine",
    body: "text-red-wine",
    button: "border-bosque text-bosque hover:bg-bosque hover:text-hueso",
    num: "text-red-wine/25",
  },
  musgo: {
    card: "bg-musgo text-bosque",
    body: "text-bosque",
    button: "border-bosque text-bosque hover:bg-bosque hover:text-hueso",
    num: "text-bosque/20",
  },
};

export default function Services({
  content,
}: {
  content: SiteContent["services"];
}) {
  const pickService = (service: string) => {
    const select = document.getElementById("service") as HTMLSelectElement | null;
    if (select) select.value = service;
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("name")?.focus({ preventScroll: true });
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

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {content.items.map((s, i) => {
            const st = themeStyles[s.theme];
            return (
              <Reveal key={s.title} from="up" delay={i * 120} as="article">
                <div
                  className={`group flex h-full flex-col overflow-hidden rounded-[20px] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-bosque/15 md:p-10 ${st.card}`}
                >
                  <span
                    className={`mb-2 font-heading text-5xl font-black leading-none ${st.num}`}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="mb-2 font-heading text-[22px]">{s.title}</h3>
                  <p className={`mb-6 flex-grow ${st.body}`}>{s.description}</p>
                  <button
                    onClick={() => pickService(s.title)}
                    className={`inline-flex w-fit items-center justify-center gap-2 rounded-full border-2 px-6 py-3 text-[15px] font-semibold transition ${st.button}`}
                  >
                    Quiero este servicio
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
