export type ServiceItem = {
  title: string;
  description: string;
  theme: "bosque" | "orquidea" | "musgo";
};

export type TestimonialItem = {
  quote: string;
  author: string;
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
  };
  services: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: ServiceItem[];
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
  };
  footer: {
    copy: string;
  };
};
