const chips = [
  { label: "SALUD", className: "bg-musgo text-bosque" },
  { label: "COMUNIDAD", className: "bg-pardo text-hueso" },
  { label: "SUPERACIÓN", className: "bg-orquidea text-red-wine" },
  { label: "DISCIPLINA", className: "bg-hueso text-pardo" },
];

/** cantidad de copias de la tira; tiene que coincidir con el -12.5% de @keyframes marquee */
const COPIES = 8;

export default function ValuesStrip() {
  return (
    <section
      aria-label="Nuestros valores"
      className="overflow-x-auto bg-bosque py-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div className="marquee-track flex w-max animate-marquee">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-4 pe-4"
            aria-hidden={copy > 0 || undefined}
          >
            {chips.map((c) => (
              <span
                key={c.label}
                className={`rounded-full px-6 py-2.5 font-heading text-[13px] font-bold whitespace-nowrap tracking-[0.04em] ${c.className}`}
              >
                {c.label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
