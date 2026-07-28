"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { AppMediaItem } from "@/lib/content/types";

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i;

export function isVideoSrc(src: string) {
  return VIDEO_EXT.test(src);
}

/**
 * Marco de celular con una grabación de pantalla (video) o una captura
 * (imagen/gif) adentro. El video no se descarga hasta que el celular entra en
 * pantalla: así quien nunca scrollea hasta acá no se baja los megas, que en
 * Supabase se pagan como egress.
 */
export default function AppPhone({
  item,
  className = "",
}: {
  item: AppMediaItem;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const isVideo = isVideoSrc(item.src);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isVideo) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isVideo]);

  return (
    <div
      ref={ref}
      className={`relative aspect-[9/19] overflow-hidden rounded-[24px] border-[5px] border-bosque bg-bosque shadow-xl shadow-bosque/25 ${className}`}
    >
      {!item.src ? null : !isVideo ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 62vw, 240px"
          className="object-cover"
        />
      ) : inView ? (
        <video
          src={item.src}
          poster={item.poster || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={item.alt}
          className="h-full w-full object-cover"
        />
      ) : item.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.poster} alt={item.alt} className="h-full w-full object-cover" />
      ) : null}
    </div>
  );
}
