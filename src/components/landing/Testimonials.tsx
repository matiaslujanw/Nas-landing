"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content/types";
import Reveal from "./Reveal";

export default function Testimonials({
  content,
}: {
  content: SiteContent["testimonials"];
}) {
  const items = content.items;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % items.length),
      6000
    );
    return () => clearInterval(id);
  }, [paused, items.length]);

  const go = (dir: number) =>
    setActive((i) => (i + dir + items.length) % items.length);

  return (
    <section id="testimonios" className="bg-orquidea/10 py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal from="up">
          <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.12em] text-red-wine">
            {content.eyebrow}
          </p>
          <h2 className="text-center text-[clamp(30px,4vw,44px)] uppercase">
            {content.heading}
          </h2>
        </Reveal>

        <Reveal from="scale" delay={100}>
          <div
            className="relative mx-auto mt-14 max-w-2xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-[24px] border border-bosque/10 bg-white shadow-xl shadow-bosque/5">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {items.map((t, i) => (
                  <blockquote
                    key={i}
                    className="w-full shrink-0 px-8 py-12 text-center md:px-16"
                  >
                    <span className="font-accent-italic block text-5xl leading-none text-orquidea">
                      “
                    </span>
                    <p className="font-accent-italic mt-2 text-[22px] leading-relaxed text-bosque md:text-[26px]">
                      {t.quote}
                    </p>
                    <cite className="mt-6 block text-[13px] font-semibold not-italic uppercase tracking-wide text-red-wine">
                      {t.author}
                    </cite>
                  </blockquote>
                ))}
              </div>
            </div>

            {items.length > 1 && (
              <>
                <button
                  aria-label="Anterior"
                  onClick={() => go(-1)}
                  className="absolute -left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-bosque/10 bg-white text-bosque shadow-md transition hover:bg-red-wine hover:text-hueso md:-left-6"
                >
                  ←
                </button>
                <button
                  aria-label="Siguiente"
                  onClick={() => go(1)}
                  className="absolute -right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-bosque/10 bg-white text-bosque shadow-md transition hover:bg-red-wine hover:text-hueso md:-right-6"
                >
                  →
                </button>

                <div className="mt-8 flex justify-center gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Testimonio ${i + 1}`}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === active ? "w-6 bg-red-wine" : "w-1.5 bg-bosque/20"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Reveal>

        {content.note && (
          <p className="mt-8 text-center text-xs text-bosque/40">{content.note}</p>
        )}
      </div>
    </section>
  );
}
