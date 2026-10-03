import { GraduationCap, Calendar, Award, ExternalLink, BookOpen } from 'lucide-react';
import { useEducation, useCertifications } from '../hooks/useContent';

export default function Education() {
  const { education, loading: eduLoading } = useEducation();
  const { certifications, loading: certLoading } = useCertifications();

  if (eduLoading || certLoading) {
    return (
      <section id="education" className="py-20 sm:py-28 px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="h-40 bg-surface rounded-xl"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-20 sm:py-28 px-6 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="pb-8 mb-12 border-b border-border">
        <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-2">
          Credentials &amp; Academic Background
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg">
          Education &amp; Certifications
        </h2>
        <p className="text-sm sm:text-base text-fg-secondary max-w-2xl mt-2">
          Formal academic training in quantitative statistics paired with industry-standard cloud and AI credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Academic Degree Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg-subtle font-semibold mb-2">
            <BookOpen size={14} className="text-accent" />
            Undergraduate Degree
          </div>

          {education.length > 0 ? (
            education.map((item, i) => (
              <div
                key={item.id || i}
                className="rounded-2xl bg-surface border border-border p-8 hover:border-border-hover transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-raised border border-border flex items-center justify-center text-accent shrink-0 mt-1">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                        {item.institution}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-fg leading-snug">
                        {item.degree}
                      </h3>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-muted bg-base px-3 py-1.5 rounded-lg border border-border shrink-0 self-start">
                    <Calendar size={13} className="text-accent" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-fg-secondary leading-relaxed pl-0 sm:pl-16">
                  {item.description}
                </p>

                <div className="mt-6 pt-6 border-t border-border pl-0 sm:pl-16 flex flex-wrap gap-2 text-xs font-mono text-fg-subtle">
                  <span className="px-2.5 py-1 rounded bg-base border border-border text-fg-muted">
                    Statistical Modeling
                  </span>
                  <span className="px-2.5 py-1 rounded bg-base border border-border text-fg-muted">
                    Probability Theory
                  </span>
                  <span className="px-2.5 py-1 rounded bg-base border border-border text-fg-muted">
                    Computational Analysis
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-surface border border-border rounded-2xl">
              <p className="font-mono text-xs text-fg-subtle">No education entries found</p>
            </div>
          )}
        </div>

        {/* Professional Certifications List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg-subtle font-semibold mb-2">
            <Award size={14} className="text-accent" />
            Verified Certifications
          </div>

          <div className="space-y-4">
            {certifications.length > 0 ? (
              certifications.map((cert, i) => (
                <div
                  key={cert.id || i}
                  className="rounded-xl bg-surface border border-border p-5 hover:border-border-hover transition-colors flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-surface-raised border border-border flex items-center justify-center shrink-0 mt-0.5 text-accent">
                    <Award size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-fg mb-1 leading-snug">
                      {cert.title}
                    </h4>

                    <div className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
                      <span className="text-accent font-semibold">{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>

                    {cert.link && cert.link !== '#' && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-fg-subtle hover:text-fg mt-2 transition-colors"
                      >
                        Verify Credential <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center bg-surface border border-border rounded-xl">
                <p className="font-mono text-xs text-fg-subtle">No certifications recorded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
