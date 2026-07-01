import Image from "next/image";
import type { SiteContent } from "@/lib/content/types";
import Reveal from "./Reveal";

export default function Hero({ content }: { content: SiteContent["hero"] }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-white to-hueso py-16 md:py-20"
    >
      {/* blobs decorativos suaves */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-orquidea/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-musgo/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-6 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal from="up" delay={0}>
            <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-red-wine">
              {content.eyebrow}
            </p>
          </Reveal>
          <Reveal from="up" delay={100}>
            <h1 className="mb-6 text-[clamp(38px,5.5vw,64px)] uppercase leading-[1.1]">
              {content.title}{" "}
              <span className="font-accent-italic normal-case">
                {content.titleAccent}
              </span>
            </h1>
          </Reveal>
          <Reveal from="up" delay={200}>
            <p className="max-w-[480px] text-[17px] text-bosque/70">
              {content.subtitle}
            </p>
          </Reveal>
          <Reveal from="up" delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-wine px-7 py-3.5 text-[15px] font-semibold text-hueso shadow-lg shadow-red-wine/20 transition hover:-translate-y-0.5 hover:bg-[#611c3b] hover:shadow-xl hover:shadow-red-wine/30"
              >
                {content.ctaPrimary}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#servicios"
                className="text-[15px] font-semibold underline underline-offset-4 transition hover:text-red-wine"
              >
                {content.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal from="scale" delay={200}>
          <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-orquidea shadow-2xl shadow-bosque/10">
            <Image
              src={content.image}
              alt="Julieta Nas"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
