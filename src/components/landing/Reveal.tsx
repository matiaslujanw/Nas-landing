"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** delay en ms para escalonar animaciones */
  delay?: number;
  /** dirección de entrada */
  from?: "up" | "left" | "right" | "scale";
  as?: "div" | "section" | "article" | "li";
};

const hiddenByDir: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate-y-8 opacity-0",
  left: "-translate-x-8 opacity-0",
  right: "translate-x-8 opacity-0",
  scale: "scale-95 opacity-0",
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : hiddenByDir[from]
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
