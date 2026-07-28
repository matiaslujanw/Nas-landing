import type { Metadata, Viewport } from "next";
import { Unbounded, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NAS Fitness Lab — Coaching 1:1 con Julieta Nas",
  description:
    "Coaching 1:1 en entrenamiento y nutrición con Julieta Nas. Sumate a la comunidad NAS y empezá tu cambio hoy.",
  // iOS no lee el manifest: para que "Añadir a inicio" abra a pantalla completa
  // hace falta este bloque. Next emite <meta mobile-web-app-capable> (el nombre
  // estándar, ya no el prefijado con apple-) más el título y el estilo de la
  // barra de estado.
  appleWebApp: {
    capable: true,
    title: "NAS",
    statusBarStyle: "default",
  },
};

// `themeColor` va acá y no en `metadata`: en metadata quedó deprecado.
export const viewport: Viewport = {
  themeColor: "#FAF7F3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${unbounded.variable} ${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
