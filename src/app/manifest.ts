import type { MetadataRoute } from "next";

/**
 * Manifest de la PWA: es lo que permite "instalar" la landing en el celular y
 * que abra a pantalla completa, con el ícono de NAS y sin la barra del
 * navegador. Los íconos viven en /public para tener una URL estable (los de
 * `src/app/icon.png` se sirven con un hash que cambia en cada build).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NAS Fitness Lab",
    short_name: "NAS",
    description:
      "Coaching 1:1 en entrenamiento y nutrición con Julieta Nas. Sumate a la comunidad NAS y empezá tu cambio hoy.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "es",
    // Fondo de la pantalla de carga y color de la barra de estado: el mismo
    // hueso del header, así no se ve un corte al abrir.
    background_color: "#FAF7F3",
    theme_color: "#FAF7F3",
    icons: [
      {
        src: "/images/brand/nas-app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/brand/nas-app-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
