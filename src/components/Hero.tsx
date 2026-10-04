import { ArrowDownRight, ExternalLink, FileText } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export default function Hero() {
  const { profileImage, openCVModal } = useProfile();

  const primaryStack = [
    { name: 'Python', role: 'Pipelines' },
    { name: 'SQL', role: 'Transformations' },
    { name: 'Apache Airflow', role: 'Orchestration' },
    { name: 'PostgreSQL', role: 'Data Storage' },
    { name: 'Great Expectations', role: 'Data Quality' },
    { name: 'Metabase', role: 'Analytics' },
    { name: 'Java', role: 'Software Development' },
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Core Positioning & Headings */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-bold tracking-tight text-fg leading-[1.08] mb-6">
            Yamkela Macwili
          </h1>

          {/* Subheading / Narrative */}
          <p className="text-base sm:text-lg text-fg-secondary font-normal max-w-2xl leading-relaxed mb-8">
            Software Engineer focused on data engineering, building reliable pipelines with <span className="text-fg font-medium">Python, SQL, and Apache Airflow</span>, with Java experience for application development. Grounded in Applied Statistics, I turn raw data into trusted datasets for analysis and decision-making.
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
          <div className="relative w-full max-w-sm sm:max-w-md group">
            {/* Main Image Holder Card */}
            <div className="relative rounded-3xl bg-surface border border-border overflow-hidden p-3 sm:p-4">
              {/* Photo Frame Container */}
              <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-base border border-border flex items-center justify-center">
                <img
                  src={profileImage || '/profile.jpg'}
                  alt="Yamkela Macwili — Software Engineer"
                  className="relative z-10 w-full h-full object-contain object-center rounded-xl p-0.5 transition-transform duration-300 group-hover:scale-[1.01]"
                />
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
            Data Engineering Tools
          </div>
          <span className="text-xs font-mono text-fg-subtle">
            Data Pipelines · Data Quality · Analytics Engineering
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
