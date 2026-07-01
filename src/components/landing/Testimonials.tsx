import type { SiteContent } from "@/lib/content/types";

export default function Testimonials({
  content,
}: {
  content: SiteContent["testimonials"];
}) {
  return (
    <section id="testimonios" className="bg-hueso py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-[0.12em] text-red-wine">
          {content.eyebrow}
        </p>
        <h2 className="text-center text-[clamp(30px,4vw,44px)] uppercase">
          {content.heading}
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {content.items.map((t, i) => (
            <blockquote
              key={i}
              className="rounded-[20px] border border-bosque/10 bg-white p-8"
            >
              <p className="font-accent-italic text-[19px] text-bosque">
                “{t.quote}”
              </p>
              <cite className="mt-4 block text-[13px] font-semibold not-italic text-red-wine">
                — {t.author}
              </cite>
            </blockquote>
          ))}
        </div>

        {content.note && (
          <p className="mt-6 text-center text-xs text-bosque/40">{content.note}</p>
        )}
      </div>
    </section>
  );
}
