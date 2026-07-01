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
    gallery: [
      "/images/julieta/julieta-about.jpg",
      "/images/julieta/julieta-hero.jpg",
      "/images/julieta/julieta-services.jpg",
      "/images/julieta/julieta-contact.jpg",
    ],
  },
  services: {
    eyebrow: "Servicios 1:1",
    heading: "Elegí tu punto de partida",
    subheading:
      "Todo el acompañamiento se arma a medida. Contame qué necesitás y armamos el plan juntas.",
    items: [
      {
        title: "Coaching 1:1",
        tagline: "Acompañamiento integral",
        description:
          "Acompañamiento personal y cercano de principio a fin. Trabajamos codo a codo para que sostengas el cambio en el tiempo, con seguimiento real y ajustes según tu progreso.",
        includes: [
          "Plan de entrenamiento y nutrición 100% personalizado",
          "Seguimiento y consultas por WhatsApp",
          "Videollamadas cada 15 días para revisar tu progreso",
          "Ajustes mes a mes según tus resultados",
          "Acceso a la comunidad de mujeres NAS",
        ],
        idealFor: [
          "Querés resultados concretos y medibles",
          "Buscás estructura y que alguien te guíe de cerca",
          "Necesitás que el plan se adapte 100% a tu vida",
        ],
        ctaLabel: "Quiero sumarme al coaching",
        ctaHref: "#contacto",
        theme: "bosque",
      },
      {
        title: "Entrenamiento",
        tagline: "Rutinas que progresan con vos",
        description:
          "Rutinas de musculación e hipertrofia diseñadas para tu nivel, tus objetivos y tu disponibilidad. Para entrenar en casa o en el gym, con progresión planificada mes a mes.",
        includes: [
          "Rutina estructurada por grupos musculares",
          "Guía práctica de entrenamiento con técnicas",
          "Acceso a la videoteca de ejercicios",
          "Progresión planificada mes a mes",
          "Sugerencias de cardio según tu objetivo",
        ],
        idealFor: [
          "Ya entrenás pero sin una rutina organizada",
          "Querés una guía clara y efectiva",
          "Buscás ganar fuerza y masa muscular",
        ],
        ctaLabel: "Quiero mi plan de entrenamiento",
        ctaHref: "#contacto",
        theme: "orquidea",
      },
      {
        title: "Nutrición",
        tagline: "Un vínculo sano con la comida",
        description:
          "Guías y planes de alimentación para crear un vínculo sano con la comida. Sin restricciones extremas ni exigencias imposibles: hábitos reales que podés sostener en el tiempo.",
        includes: [
          "Guía de alimentación adaptada a tus gustos",
          "Estrategias para sostener hábitos en el tiempo",
          "Recetas saludables y prácticas",
          "Pautas para comer con flexibilidad",
          "Acompañamiento para dudas y consultas",
        ],
        idealFor: [
          "Querés ordenar tu alimentación sin dietas extremas",
          "Buscás potenciar los resultados del entrenamiento",
          "Necesitás aprender a nutrir tu cuerpo",
        ],
        ctaLabel: "Quiero mejorar mi nutrición",
        ctaHref: "#contacto",
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
