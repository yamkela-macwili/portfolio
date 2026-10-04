import { useState } from 'react';
import { Loader2, AlertCircle, Mail, Github, Linkedin, Copy, Check, Send } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormInputs>();

  const copyEmail = () => {
    navigator.clipboard.writeText('yamkela22y@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-6 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="pb-8 mb-12 border-b border-border">
        <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-2">
          Direct Communication
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg">
          Let's Build Reliable Data Workflows
        </h2>
        <p className="text-sm sm:text-base text-fg-secondary max-w-2xl mt-2">
          Have a Software Engineering opportunity focused on data, or a project that needs reliable data workflows? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info & Socials Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-surface border border-border p-8 flex flex-col justify-between h-full">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-3">
                Contact Coordinates
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-fg mb-3">
                Yamkela Macwili
              </h3>

              <p className="text-sm text-fg-secondary leading-relaxed mb-6">
                Based in Cape Town, South Africa (UTC+2). Available for full-time software engineering roles, contracts, and remote collaborations.
              </p>

              {/* One-Click Copy Email Card */}
              <div className="p-4 rounded-xl bg-base border border-border mb-6">
                <div className="text-[11px] font-mono text-fg-subtle uppercase tracking-wider mb-2">
                  Direct Email Address
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs sm:text-sm text-fg font-medium truncate">
                    yamkela22y@gmail.com
                  </span>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-surface-hover text-fg-muted hover:text-fg font-mono text-xs inline-flex items-center gap-1.5 transition-colors shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-accent" />
                        <span className="text-accent">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-2.5 font-mono text-xs">
                <a
                  href="https://github.com/yamkela-macwili"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-base border border-border text-fg-muted hover:text-fg hover:border-border-hover transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Github size={16} className="text-accent" />
                    <span>github.com/yamkela-macwili</span>
                  </div>
                  <span className="text-fg-subtle group-hover:text-fg">↗</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/yamkela-macwili-116442253/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-base border border-border text-fg-muted hover:text-fg hover:border-border-hover transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin size={16} className="text-accent" />
                    <span>linkedin.com/in/yamkela-macwili</span>
                  </div>
                  <span className="text-fg-subtle group-hover:text-fg">↗</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border font-mono text-xs text-fg-subtle flex items-center justify-between">
              <span>Typical Response Time</span>
              <span className="text-accent font-semibold">&lt; 24 Hours</span>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-surface border border-border p-8 sm:p-10 shadow-lg">
            <h3 className="text-xl font-bold text-fg mb-2">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-fg-secondary mb-6">
              Fill out this form and I will get back to you promptly.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs uppercase tracking-wider text-fg-muted font-semibold">
                    Your Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className={`w-full px-4 py-3 bg-base border text-sm text-fg rounded-xl focus:outline-none transition-colors placeholder:text-fg-subtle ${
                      errors.name ? 'border-danger focus:border-danger' : 'border-border focus:border-accent'
                    }`}
                    placeholder="e.g. Alex Morgan"
                  />
                  {errors.name && (
                    <p className="text-danger font-mono text-xs flex items-center gap-1 mt-1">
                      <AlertCircle size={12} /> {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs uppercase tracking-wider text-fg-muted font-semibold">
                    Your Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    className={`w-full px-4 py-3 bg-base border text-sm text-fg rounded-xl focus:outline-none transition-colors placeholder:text-fg-subtle ${
                      errors.email ? 'border-danger focus:border-danger' : 'border-border focus:border-accent'
                    }`}
                    placeholder="alex@company.com"
                  />
                  {errors.email && (
                    <p className="text-danger font-mono text-xs flex items-center gap-1 mt-1">
                      <AlertCircle size={12} /> {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-xs uppercase tracking-wider text-fg-muted font-semibold">
                  Subject
                </label>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  type="text"
                  className={`w-full px-4 py-3 bg-base border text-sm text-fg rounded-xl focus:outline-none transition-colors placeholder:text-fg-subtle ${
                    errors.subject ? 'border-danger focus:border-danger' : 'border-border focus:border-accent'
                  }`}
                  placeholder="Software Engineering Role / Data Project"
                />
                {errors.subject && (
                  <p className="text-danger font-mono text-xs flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-xs uppercase tracking-wider text-fg-muted font-semibold">
                  Message
                </label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows={4}
                  className={`w-full px-4 py-3 bg-base border text-sm text-fg rounded-xl focus:outline-none transition-colors placeholder:text-fg-subtle resize-none ${
                    errors.message ? 'border-danger focus:border-danger' : 'border-border focus:border-accent'
                  }`}
                  placeholder="Provide context on your project, technical requirements, or role specification..."
                />
                {errors.message && (
                  <p className="text-danger font-mono text-xs flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full py-4 px-6 bg-fg text-dark hover:bg-accent hover:text-on-accent rounded-xl font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Transmitting Message...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check size={16} className="text-accent-dark" />
                    Message Dispatched Successfully
                  </>
                ) : (
                  <>
                    Send Message <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
