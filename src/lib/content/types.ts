export type ServiceItem = {
  title: string;
  /** subtítulo corto que acompaña al nombre en la pestaña */
  tagline: string;
  description: string;
  /** bullets de "¿Qué incluye?" */
  includes: string[];
  /** bullets de "Ideal para vos si..." */
  idealFor: string[];
  /** texto del botón principal */
  ctaLabel: string;
  /** destino del botón: "#contacto" pre-carga el formulario; una URL abre link externo */
  ctaHref: string;
  theme: "bosque" | "orquidea" | "musgo";
};

export type TestimonialItem = {
  quote: string;
  author: string;
};

export type AppMediaItem = {
  /** URL del archivo: video (mp4/webm/mov) o imagen (jpg/png/gif/webp) */
  src: string;
  /** primer frame que se muestra mientras el video carga; opcional */
  poster: string;
  /** descripción para lectores de pantalla */
  alt: string;
};

export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    quote: string;
    image: string;
    /** fotos para el carrusel; si está vacío se usa `image` */
    gallery: string[];
  };
  services: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: ServiceItem[];
  };
  app: {
    heading: string;
    subheading: string;
    /** bullets de la lista */
    bullets: string[];
    ctaLabel: string;
    /** destino del botón: "#contacto" o una URL externa */
    ctaHref: string;
    /** capturas o grabaciones de pantalla que se muestran en los celulares */
    media: AppMediaItem[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    items: TestimonialItem[];
    note: string;
  };
  contact: {
    heading: string;
    description: string;
    instagramHandle: string;
    instagramUrl: string;
    email: string;
    phone: string;
    /** URLs de redes (vacío = no se muestra el ícono) */
    youtubeUrl: string;
    xUrl: string;
    facebookUrl: string;
  };
  footer: {
    copy: string;
  };
};
