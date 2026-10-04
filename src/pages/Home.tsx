import { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import OpenToWork from '../components/OpenToWork';
import Contact from '../components/Contact';

export default function Home() {
  useEffect(() => {
    // Ensure viewport lands on top (Hero section) when Home mounts or refreshes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Education />
      <Projects />
      <Blog />
      <OpenToWork />
      <Contact />
    </main>
  );
}
