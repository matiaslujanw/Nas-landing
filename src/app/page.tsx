import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ValuesStrip from "@/components/landing/ValuesStrip";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import { loadContent } from "@/lib/content/load";

export const revalidate = 60;

export default async function Home() {
  const content = await loadContent();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero content={content.hero} />
        <ValuesStrip />
        <About content={content.about} />
        <Services content={content.services} />
        <Testimonials content={content.testimonials} />
        <Contact content={content.contact} />
      </main>
      <Footer content={content.footer} instagramUrl={content.contact.instagramUrl} />
    </>
  );
}
