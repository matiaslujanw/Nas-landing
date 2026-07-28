import type { SiteContent } from "@/lib/content/types";
import AppPhone from "./AppPhone";
import Reveal from "./Reveal";

export default function AppSection({ content }: { content: SiteContent["app"] }) {
  const media = content.media.filter((m) => m.src);

  return (
    <section id="app" className="bg-orquidea py-20">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 md:grid-cols-[1fr_1.05fr] md:gap-16">
        <Reveal from="left">
          <h2 className="mb-5 text-[clamp(30px,4vw,46px)] uppercase text-hueso">
            {content.heading}
          </h2>
          <p className="mb-7 max-w-[46ch] text-[17px] font-semibold text-hueso">
            {content.subheading}
          </p>
          <ul className="mb-9 flex flex-col gap-3">
            {content.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-hueso/95">
                <span
                  aria-hidden
                  className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-hueso"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {content.ctaLabel && (
            <a
              href={content.ctaHref || "#contacto"}
              className="inline-flex items-center justify-center rounded-full border-2 border-hueso px-9 py-3.5 text-[14px] font-semibold uppercase tracking-[0.08em] text-hueso transition hover:bg-hueso hover:text-red-wine"
            >
              {content.ctaLabel}
            </a>
          )}
        </Reveal>

        {media.length > 0 && (
          <Reveal from="right">
            {/* En celu se deslizan de a uno; en desktop entran los tres juntos. */}
            <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
              {media.map((m, i) => (
                <AppPhone
                  key={i}
                  item={m}
                  className="w-[62%] shrink-0 snap-center md:w-auto"
                />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
