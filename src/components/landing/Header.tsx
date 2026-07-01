"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#sobre-mi", label: "Sobre Julieta" },
  { href: "#servicios", label: "Servicios" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-hueso/90 backdrop-blur transition-all duration-300 ${
        scrolled
          ? "border-bosque/10 shadow-lg shadow-bosque/5"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-heading text-[22px] font-black tracking-wide text-bosque">
            NAS
          </span>
          <span className="mt-1 text-[9px] font-medium tracking-[0.28em] text-red-wine">
            FITNESS LAB
          </span>
        </a>

        <nav className="ml-auto mr-6 hidden gap-8 text-sm font-semibold md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-red-wine">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden rounded-full border-2 border-red-wine px-5 py-2.5 text-sm font-semibold text-red-wine transition hover:bg-red-wine hover:text-hueso md:inline-flex"
        >
          Quiero sumarme
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className="block h-0.5 w-6 bg-bosque" />
          <span className="block h-0.5 w-6 bg-bosque" />
          <span className="block h-0.5 w-6 bg-bosque" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-5 border-t border-bosque/10 bg-hueso px-6 py-6 text-base font-semibold md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
