import Image from "next/image";
import type { SiteContent } from "@/lib/content/types";

export default function Footer({
  content,
  instagramUrl,
}: {
  content: SiteContent["footer"];
  instagramUrl: string;
}) {
  const links = [
    { href: "#sobre-mi", label: "Sobre Julieta" },
    { href: "#servicios", label: "Servicios" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <footer className="border-t border-bosque/10 bg-white py-12">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-6 px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/images/brand/nas-icon-bosque.png"
            alt="NAS Fitness Lab"
            width={40}
            height={40}
            className="h-9 w-9"
          />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-[22px] font-black text-bosque">NAS</span>
            <span className="mt-1 text-[9px] font-medium tracking-[0.28em] text-musgo">
              FITNESS LAB
            </span>
          </span>
        </a>

        <nav className="flex flex-wrap gap-6 text-sm font-semibold">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-red-wine">
              {l.label}
            </a>
          ))}
          <a href={instagramUrl} target="_blank" rel="noopener" className="hover:text-red-wine">
            Instagram
          </a>
        </nav>

        <p className="mt-2 w-full text-center text-[13px] text-bosque/40">
          {content.copy}
        </p>
      </div>
    </footer>
  );
}
