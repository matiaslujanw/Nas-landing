"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function PhotoCarousel({
  images,
  alt,
  interval = 5000,
  className = "",
}: {
  images: string[];
  alt: string;
  interval?: number;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(id);
  }, [count, interval]);

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-musgo ${className}`}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          priority={i === 0}
          className={`object-cover object-top transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* indicadores */}
      {count > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Ver foto ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-6 bg-hueso" : "w-1.5 bg-hueso/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
