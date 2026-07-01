import Image from "next/image";
import type { SiteContent } from "@/lib/content/types";

export default function About({ content }: { content: SiteContent["about"] }) {
  return (
    <section id="sobre-mi" className="py-24">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 md:grid-cols-[0.85fr_1.15fr]">
        <div className="relative order-first aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-musgo md:order-none">
          <Image
            src={content.image}
            alt="Julieta Nas entrenando"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-top"
          />
        </div>

        <div>
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-red-wine">
            {content.eyebrow}
          </p>
          <h2 className="mb-4 text-[clamp(30px,4vw,44px)] uppercase">
            {content.heading}
          </h2>
          {content.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-bosque/80">
              {p}
            </p>
          ))}
          <p className="font-accent-italic my-6 text-[22px] text-red-wine">
            “{content.quote}”
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-full bg-red-wine px-7 py-3.5 text-[15px] font-semibold text-hueso transition hover:bg-[#611c3b]"
          >
            Conocé mi propuesta
          </a>
        </div>
      </div>
    </section>
  );
}
