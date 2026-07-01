import type { SiteContent } from "./types";

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: "Comunidad motivadora de mujeres",
    title: "Siempre lista",
    titleAccent: "para entrenar",
    subtitle:
      "Coaching 1:1 en entrenamiento y nutrición con Julieta Nas, para construir hábitos que se sostengan de verdad: salud, disciplina y superación en tu propio ritmo.",
    ctaPrimary: "Quiero sumarme",
    ctaSecondary: "Ver servicios",
    image: "/images/julieta/julieta-hero.jpg",
  },
  about: {
    eyebrow: "Sobre mí",
    heading: "¡Hola, soy Julieta!",
    paragraphs: [
      "Fundadora de NAS Fitness Lab. Mi misión es motivar a la gente a entrenar y tener buenos hábitos, alimentación y descanso — tanto si estás dando tus primeros pasos como si ya venís entrenando hace tiempo.",
      "Trabajo para que cada mujer que entra a NAS se sienta parte de una comunidad: con programas prácticos, acompañamiento cercano y planes que se adaptan a tu vida, no al revés.",
    ],
    quote: "Entrenar es confianza, fuerza y bienestar.",
    image: "/images/julieta/julieta-about.jpg",
  },
  services: {
    eyebrow: "Servicios 1:1",
    heading: "Elegí tu punto de partida",
    subheading:
      "Todo el acompañamiento se arma a medida. Contame qué necesitás y armamos el plan juntas.",
    items: [
      {
        title: "Coaching 1:1",
        description:
          "Acompañamiento personal y cercano para que sostengas el cambio en el tiempo: objetivos claros, seguimiento constante y ajustes según tu progreso.",
        theme: "bosque",
      },
      {
        title: "Entrenamiento",
        description:
          "Rutinas de musculación e hipertrofia adaptadas a tu nivel, tu disponibilidad y tus objetivos — para entrenar en casa o en el gym.",
        theme: "orquidea",
      },
      {
        title: "Nutrición",
        description:
          "Guías y planes de alimentación pensados para crear un vínculo sano con la comida, sin restricciones extremas ni exigencias imposibles.",
        theme: "musgo",
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimonios",
    heading: "Lo que dice la comunidad",
    items: [
      {
        quote:
          "Empecé sin saber nada de entrenamiento y hoy siento que tengo un estilo de vida, no una dieta de un mes.",
        author: "Testimonio de ejemplo",
      },
      {
        quote:
          "El acompañamiento 1:1 hizo toda la diferencia. Se nota que arma cada plan pensando en vos.",
        author: "Testimonio de ejemplo",
      },
      {
        quote:
          "La comunidad NAS te hace sentir acompañada todo el proceso, no sola entrenando.",
        author: "Testimonio de ejemplo",
      },
    ],
    note: "* Testimonios de ejemplo — reemplazar por reseñas reales de clientas.",
  },
  contact: {
    heading: "Empecemos hoy",
    description:
      "Contame qué servicio te interesa y te respondo a la brevedad para coordinar los próximos pasos.",
    instagramHandle: "@juli.nas",
    instagramUrl: "https://www.instagram.com/juli.nas",
    email: "digitalamenitiessas@gmail.com",
    phone: "",
  },
  footer: {
    copy: "© 2026 NAS Fitness Lab — Julieta Nas",
  },
};
