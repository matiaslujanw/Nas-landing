import Image from "next/image";
import type { SiteContent } from "@/lib/content/types";

export default function Hero({ content }: { content: SiteContent["hero"] }) {
  return (
    <section
      id="top"
      className="bg-gradient-to-b from-white to-hueso py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-red-wine">
            {content.eyebrow}
          </p>
          <h1 className="mb-6 text-[clamp(38px,5.5vw,64px)] uppercase leading-[1.1]">
            {content.title}{" "}
            <span className="font-accent-italic normal-case">
              {content.titleAccent}
            </span>
          </h1>
          <p className="max-w-[480px] text-[17px] text-bosque/70">
            {content.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full bg-red-wine px-7 py-3.5 text-[15px] font-semibold text-hueso transition hover:bg-[#611c3b]"
            >
              {content.ctaPrimary}
            </a>
            <a
              href="#servicios"
              className="text-[15px] font-semibold underline underline-offset-4"
            >
              {content.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-orquidea">
          <Image
            src={content.image}
            alt="Julieta Nas"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
