import { ArrowRight, ArrowDownRight, ExternalLink, FileText, MapPin, CheckCircle2 } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export default function Hero() {
  const { profileImage, openCVModal } = useProfile();

  const primaryStack = [
    { name: 'Python', role: 'Backend & Data' },
    { name: 'FastAPI', role: 'REST APIs' },
    { name: 'Java', role: 'Systems' },
    { name: 'React', role: 'Frontend' },
    { name: 'TypeScript', role: 'Type Safety' },
    { name: 'PostgreSQL', role: 'Relational DB' },
    { name: 'Apache Airflow 3', role: 'Orchestration' },
    { name: 'Metabase', role: 'BI & Analytics' },
    { name: 'Docker', role: 'Containers' },
    { name: 'Azure OpenAI', role: 'LLM Systems' },
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Core Positioning & Headings */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Subtitle / Role Tagline */}
          <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Full-Stack Software Engineer &amp; Data Architect · Cape Town, ZA
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-bold tracking-tight text-fg leading-[1.08] mb-6">
            Yamkela Macwili
          </h1>

          {/* Subheading / Narrative */}
          <p className="text-base sm:text-lg text-fg-secondary font-normal max-w-2xl leading-relaxed mb-8">
            I engineer resilient web applications, distributed backend services, and automated data pipelines. Backed by academic training in <span className="text-fg font-medium">Applied Statistics</span> with rigorous production focus on data integrity, determinism, and high-performance user interfaces.
          </p>

          {/* Action CTA Buttons & Quick Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 py-3.5 bg-fg text-dark hover:bg-accent hover:text-on-accent transition-colors duration-200 rounded-xl text-xs font-mono font-bold inline-flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              Explore Projects <ArrowDownRight size={16} />
            </a>

            <button
              onClick={openCVModal}
              className="w-full sm:w-auto px-5 py-3.5 bg-surface border border-border text-fg hover:border-accent hover:text-accent transition-colors duration-200 rounded-xl text-xs font-mono font-semibold inline-flex items-center justify-center gap-2 active:scale-95 group cursor-pointer"
              title="Open Curriculum Vitae"
            >
              <FileText size={15} className="text-accent group-hover:scale-110 transition-transform" />
              <span>View CV / Resume</span>
            </button>

            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <a
                href="https://github.com/yamkela-macwili"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-3 bg-surface border border-border text-fg-muted hover:text-fg hover:border-border-hover rounded-xl text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                title="GitHub Profile"
              >
                GitHub <ExternalLink size={12} />
              </a>

              <a
                href="https://www.linkedin.com/in/yamkela-macwili-116442253/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-3 bg-surface border border-border text-fg-muted hover:text-fg hover:border-border-hover rounded-xl text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                title="LinkedIn Profile"
              >
                LinkedIn <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Profile Image Holder Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md group">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-accent/20 via-border-hover/30 to-accent/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Main Image Holder Card */}
            <div className="relative rounded-3xl bg-surface border border-border overflow-hidden shadow-2xl p-4 sm:p-5 flex flex-col">
              {/* Photo Frame Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-base border border-border group/img">
                <img
                  src={profileImage || '/profile.jpg'}
                  alt="Yamkela Macwili — Software Engineer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-[1.03]"
                />
              </div>

              {/* Bottom Identity & Quick Actions Strip */}
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-fg flex items-center gap-1.5">
                    Yamkela Macwili
                    <CheckCircle2 size={14} className="text-accent" />
                  </div>
                  <div className="text-[11px] font-mono text-fg-subtle flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="text-accent" />
                    <span>Cape Town, South Africa</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openCVModal}
                  className="px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-surface-hover border border-border hover:border-accent text-accent font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText size={12} />
                  <span>Open CV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Tech Stack Showcase Strip */}
      <div className="mt-16 sm:mt-20 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="text-xs font-mono uppercase tracking-widest text-fg-subtle font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Core Technologies &amp; Production Stack
          </div>
          <span className="text-xs font-mono text-fg-subtle">
            Full-Stack · Data Engineering · Distributed Backends
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {primaryStack.map((tech) => (
            <div
              key={tech.name}
              className="px-3.5 py-1.5 bg-surface border border-border hover:border-accent rounded-lg transition-colors group flex items-center gap-2"
            >
              <span className="font-mono text-xs font-medium text-fg group-hover:text-accent transition-colors">
                {tech.name}
              </span>
              <span className="text-[10px] font-mono text-fg-subtle uppercase">
                / {tech.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
