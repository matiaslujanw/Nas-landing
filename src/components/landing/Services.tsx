"use client";

import type { SiteContent } from "@/lib/content/types";

const themeStyles: Record<
  SiteContent["services"]["items"][number]["theme"],
  { card: string; body: string; button: string }
> = {
  bosque: {
    card: "bg-bosque text-hueso",
    body: "text-hueso/85",
    button: "border-hueso text-hueso hover:bg-hueso hover:text-bosque",
  },
  orquidea: {
    card: "bg-orquidea text-red-wine",
    body: "text-red-wine",
    button: "border-bosque text-bosque hover:bg-bosque hover:text-hueso",
  },
  musgo: {
    card: "bg-musgo text-bosque",
    body: "text-bosque",
    button: "border-bosque text-bosque hover:bg-bosque hover:text-hueso",
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
        <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.12em] text-red-wine">
          {content.eyebrow}
        </p>
        <h2 className="text-center text-[clamp(30px,4vw,44px)] uppercase">
          {content.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-center text-bosque/70">
          {content.subheading}
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {content.items.map((s) => {
            const st = themeStyles[s.theme];
            return (
              <article
                key={s.title}
                className={`flex flex-col rounded-[20px] p-8 md:p-10 ${st.card}`}
              >
                <h3 className="mb-2 font-heading text-[22px]">{s.title}</h3>
                <p className={`mb-6 flex-grow ${st.body}`}>{s.description}</p>
                <button
                  onClick={() => pickService(s.title)}
                  className={`inline-flex w-fit items-center justify-center rounded-full border-2 px-6 py-3 text-[15px] font-semibold transition ${st.button}`}
                >
                  Quiero este servicio
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
