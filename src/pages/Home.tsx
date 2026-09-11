import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import OpenToWork from '../components/OpenToWork';
import Contact from '../components/Contact';

export default function Home() {
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
