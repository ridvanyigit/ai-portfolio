import HeroSection from "./(sections)/hero/HeroSection";
import MarqueeSection from "./(sections)/marquee/MarqueeSection";
import AboutSection from "./(sections)/about/AboutSection";
import ServicesSection from "./(sections)/services/ServicesSection";
import ProjectsSection from "./(sections)/projects/ProjectsSection";
import ContactSection from "./(sections)/contact/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

