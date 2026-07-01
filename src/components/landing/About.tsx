import type { SiteContent } from "@/lib/content/types";
import PhotoCarousel from "./PhotoCarousel";
import Reveal from "./Reveal";

export default function About({ content }: { content: SiteContent["about"] }) {
  const gallery =
    content.gallery && content.gallery.length > 0
      ? content.gallery
      : [content.image];

  return (
    <section id="sobre-mi" className="py-24">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal from="left" className="order-first md:order-none">
          <PhotoCarousel images={gallery} alt="Julieta Nas" interval={5000} />
        </Reveal>

        <Reveal from="right">
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
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-wine px-7 py-3.5 text-[15px] font-semibold text-hueso transition hover:bg-[#611c3b]"
          >
            Conocé mi propuesta
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
