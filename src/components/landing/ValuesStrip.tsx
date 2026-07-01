const chips = [
  { label: "SALUD", className: "bg-musgo text-bosque" },
  { label: "COMUNIDAD", className: "bg-pardo text-hueso" },
  { label: "SUPERACIÓN", className: "bg-orquidea text-red-wine" },
  { label: "DISCIPLINA", className: "bg-hueso text-pardo" },
];

export default function ValuesStrip() {
  return (
    <section className="bg-bosque py-7">
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-center gap-4 px-6">
        {chips.map((c) => (
          <span
            key={c.label}
            className={`rounded-full px-6 py-2.5 font-heading text-[13px] font-bold tracking-[0.04em] ${c.className}`}
          >
            {c.label}
          </span>
        ))}
      </div>
    </section>
  );
}
