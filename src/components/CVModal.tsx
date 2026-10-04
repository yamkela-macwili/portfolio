import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  Edit3,
  Download,
  Upload,
  RotateCcw,
  Check,
  ExternalLink,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Award,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  FileText,
  Camera,
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import { CVProfile, defaultCVData } from '../data/defaultCV';

export default function CVModal() {
  const { user } = useAuth();
  const { cvData, updateCV, resetCV, isCVModalOpen, closeCVModal, openImageModal } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CVProfile>(cvData);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'edit' | 'pdf'>('preview');
  const printRef = useRef<HTMLDivElement>(null);

  // Sync form data when cvData updates or modal opens
  React.useEffect(() => {
    if (isCVModalOpen) {
      setFormData(cvData);
    }
  }, [isCVModalOpen, cvData]);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveEdit = () => {
    updateCV(formData);
    setIsEditing(false);
    setActiveTab('preview');
  };

  const handleReset = () => {
    if (window.confirm('Reset CV to default Yamkela Macwili profile data?')) {
      resetCV();
      setFormData(defaultCVData);
      setIsEditing(false);
    }
  };

  const handleCopyText = () => {
    const plainText = `
${formData.name} - ${formData.title}
Location: ${formData.location} | Email: ${formData.email}
GitHub: ${formData.github} | LinkedIn: ${formData.linkedin} | Portfolio: ${formData.website}

SUMMARY
${formData.summary}

CORE SKILLS
${formData.skills.map((s) => `${s.category}: ${s.items.join(', ')}`).join('\n')}

FEATURED PROJECTS
${formData.projects
  .map(
    (p) => `
* ${p.title} (${p.category})
  ${p.desc}
  Tech: ${p.tech.join(', ')}
  Highlights: ${p.highlights.join('; ')}
  GitHub: ${p.github || 'N/A'} | Link: ${p.link || 'N/A'}
`
  )
  .join('')}

EXPERIENCE
${formData.experience
  .map(
    (e) => `
* ${e.role} | ${e.company} (${e.period}) - ${e.location}
  ${e.description}
  Highlights:
  ${e.highlights.map((h) => `  - ${h}`).join('\n')}
`
  )
  .join('')}

EDUCATION
${formData.education
  .map(
    (ed) => `
* ${ed.degree} - ${ed.institution} (${ed.period})
  ${ed.details}
`
  )
  .join('')}

CERTIFICATIONS
${formData.certifications
  .map((c) => `* ${c.title} - ${c.issuer} (${c.date})`)
  .join('\n')}
    `.trim();

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${formData.name.toLowerCase().replace(/\s+/g, '_')}_cv.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setFormData(imported);
        updateCV(imported);
        alert('CV imported successfully!');
      } catch {
        alert('Invalid JSON file. Please provide a valid CV JSON export.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <AnimatePresence>
      {isCVModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCVModal}
            className="fixed inset-0 bg-black/85 backdrop-blur-md print:hidden"
          />

          {/* Main Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden z-10 print:max-w-none print:w-full print:h-auto print:max-h-none print:border-none print:rounded-none print:shadow-none print:bg-white print:text-black"
          >
            {/* Top Toolbar (Hidden during browser printing) */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-surface-raised border-b border-border print:hidden">
              {/* Left Title & Status */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-accent">
                  <FileText size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-fg flex items-center gap-2">
                    {formData.name} <span className="text-fg-subtle font-normal font-mono text-xs">/ Curriculum Vitae</span>
                  </h2>
                  <p className="text-[11px] font-mono text-accent">
                    {isEditing ? 'Editing Mode (Changes will be saved locally)' : 'Engineering Resume Template'}
                  </p>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {activeTab === 'preview' && (
                  <>
                    {user && (
                      <>
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setActiveTab('edit');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-fg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
                          title="Edit CV contents"
                        >
                          <Edit3 size={13} className="text-accent" />
                          <span>Edit Info</span>
                        </button>

                        <button
                          onClick={openImageModal}
                          className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-fg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
                          title="Change Profile Photo"
                        >
                          <Camera size={13} className="text-accent" />
                          <span>Change Photo</span>
                        </button>
                      </>
                    )}

                    <button
                      onClick={handlePrint}
                      className="px-3.5 py-1.5 rounded-lg bg-accent text-on-accent hover:bg-accent-light text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-glow"
                      title="Print or Save as PDF"
                    >
                      <Printer size={13} />
                      <span>Print / PDF</span>
                    </button>

                    <button
                      onClick={handleCopyText}
                      className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-fg-muted hover:text-fg text-xs font-mono transition-colors"
                      title="Copy plain text"
                    >
                      {copied ? (
                        <span className="text-accent flex items-center gap-1">
                          <Check size={13} /> Copied
                        </span>
                      ) : (
                        'Copy Text'
                      )}
                    </button>

                    <button
                      onClick={handleExportJSON}
                      className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-fg-muted hover:text-fg text-xs font-mono transition-colors"
                      title="Download JSON structure"
                    >
                      <Download size={13} />
                    </button>
                  </>
                )}

                {activeTab === 'edit' && (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-1.5 rounded-lg bg-accent text-on-accent hover:bg-accent-light text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-glow"
                    >
                      <Check size={13} /> Save Changes
                    </button>

                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setActiveTab('preview');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-border text-fg-muted hover:text-fg text-xs font-mono transition-colors"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-3 py-1.5 rounded-lg bg-danger-subtle text-danger hover:bg-danger/20 text-xs font-mono transition-colors"
                      title="Reset to default template"
                    >
                      <RotateCcw size={13} />
                    </button>
                  </>
                )}

                {/* Close Button */}
                <button
                  onClick={closeCVModal}
                  className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-fg-subtle hover:text-fg transition-colors ml-1"
                  aria-label="Close CV Modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 print:p-0 print:overflow-visible">
              {/* EDIT MODE FORM */}
              {activeTab === 'edit' ? (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="p-4 rounded-xl bg-base border border-border flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-fg">Live CV Customizer</h3>
                      <p className="text-xs text-fg-subtle">
                        Modify any section below to personalize your resume. Click "Save Changes" when done.
                      </p>
                    </div>

                    <label className="px-3 py-1.5 rounded-lg bg-surface-raised border border-border hover:border-accent text-fg text-xs font-mono cursor-pointer flex items-center gap-1.5">
                      <Upload size={13} className="text-accent" />
                      <span>Import JSON</span>
                      <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                    </label>
                  </div>

                  {/* Header & Personal Info Inputs */}
                  <div className="p-6 rounded-2xl bg-base border border-border space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                      Personal &amp; Contact Info
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-fg-subtle mb-1">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-fg-subtle mb-1">Professional Title</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-fg-subtle mb-1">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-fg-subtle mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-fg-subtle mb-1">GitHub URL</label>
                        <input
                          type="url"
                          value={formData.github}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-fg-subtle mb-1">LinkedIn URL</label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-fg-subtle mb-1">Professional Summary</label>
                      <textarea
                        rows={4}
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  {/* Skills Editor */}
                  <div className="p-6 rounded-2xl bg-base border border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                        Skills &amp; Technologies
                      </h4>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            skills: [...formData.skills, { category: 'New Category', items: ['Skill 1', 'Skill 2'] }],
                          })
                        }
                        className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
                      >
                        <Plus size={13} /> Add Category
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.skills.map((skillGroup, idx) => (
                        <div key={idx} className="p-3 bg-surface border border-border rounded-xl flex items-start gap-3">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={skillGroup.category}
                              onChange={(e) => {
                                const updated = [...formData.skills];
                                updated[idx].category = e.target.value;
                                setFormData({ ...formData, skills: updated });
                              }}
                              placeholder="Category Name"
                              className="px-3 py-1.5 bg-base border border-border rounded text-xs text-fg font-mono font-semibold"
                            />
                            <input
                              type="text"
                              value={skillGroup.items.join(', ')}
                              onChange={(e) => {
                                const updated = [...formData.skills];
                                updated[idx].items = e.target.value.split(',').map((s) => s.trim());
                                setFormData({ ...formData, skills: updated });
                              }}
                              placeholder="Comma separated skills (e.g. Python, React, PostgreSQL)"
                              className="sm:col-span-2 px-3 py-1.5 bg-base border border-border rounded text-xs text-fg font-mono"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.skills.filter((_, i) => i !== idx);
                              setFormData({ ...formData, skills: updated });
                            }}
                            className="p-1 text-danger hover:bg-danger/10 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience Editor */}
                  <div className="p-6 rounded-2xl bg-base border border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                        Work Experience &amp; Engineering Roles
                      </h4>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            experience: [
                              ...formData.experience,
                              {
                                id: `exp-${Date.now()}`,
                                role: 'Software Engineer',
                                company: 'Company Name',
                                location: 'Remote / Location',
                                period: '2024 - Present',
                                description: 'Role overview...',
                                highlights: ['Accomplishment or key responsibility'],
                                techStack: ['Python', 'FastAPI'],
                              },
                            ],
                          })
                        }
                        className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
                      >
                        <Plus size={13} /> Add Role
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.experience.map((exp, idx) => (
                        <div key={exp.id || idx} className="p-4 bg-surface border border-border rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-fg">Role #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = formData.experience.filter((_, i) => i !== idx);
                                setFormData({ ...formData, experience: updated });
                              }}
                              className="p-1 text-danger hover:bg-danger/10 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => {
                                const updated = [...formData.experience];
                                updated[idx].role = e.target.value;
                                setFormData({ ...formData, experience: updated });
                              }}
                              placeholder="Role Title"
                              className="px-3 py-1.5 bg-base border border-border rounded text-xs text-fg font-sans"
                            />
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => {
                                const updated = [...formData.experience];
                                updated[idx].company = e.target.value;
                                setFormData({ ...formData, experience: updated });
                              }}
                              placeholder="Company Name"
                              className="px-3 py-1.5 bg-base border border-border rounded text-xs text-fg font-sans"
                            />
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => {
                                const updated = [...formData.experience];
                                updated[idx].period = e.target.value;
                                setFormData({ ...formData, experience: updated });
                              }}
                              placeholder="Period (e.g. 2023 - Present)"
                              className="px-3 py-1.5 bg-base border border-border rounded text-xs text-fg font-mono"
                            />
                          </div>

                          <textarea
                            rows={2}
                            value={exp.description}
                            onChange={(e) => {
                                const updated = [...formData.experience];
                                updated[idx].description = e.target.value;
                                setFormData({ ...formData, experience: updated });
                            }}
                            placeholder="Brief role summary..."
                            className="w-full px-3 py-1.5 bg-base border border-border rounded text-xs text-fg font-sans"
                          />

                          <div>
                            <label className="block text-[11px] font-mono text-fg-subtle mb-1">
                              Key Highlights (one per line)
                            </label>
                            <textarea
                              rows={3}
                              value={exp.highlights.join('\n')}
                              onChange={(e) => {
                                const updated = [...formData.experience];
                                updated[idx].highlights = e.target.value.split('\n').filter((h) => h.trim());
                                setFormData({ ...formData, experience: updated });
                              }}
                              placeholder="Bullet points of impact..."
                              className="w-full px-3 py-1.5 bg-base border border-border rounded text-xs text-fg font-sans"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* PREVIEW CV TEMPLATE (Pixel-perfect Printable Format) */
                <div
                  ref={printRef}
                  className="max-w-4xl mx-auto bg-surface print:bg-white border border-border print:border-none p-6 sm:p-10 rounded-2xl print:rounded-none shadow-lg print:shadow-none space-y-8 print:space-y-6 text-fg print:text-black font-sans print:p-0"
                >
                  {/* CV Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border print:border-black/20">
                    <div className="flex items-center gap-5">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-base border-2 border-accent/40 shadow-glow shrink-0 print:border-black/30 print:shadow-none">
                        <img
                          src={formData.profileImage || '/profile.jpg'}
                          alt={formData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-fg print:text-black">
                          {formData.name}
                        </h1>
                        <p className="text-sm font-semibold text-accent print:text-black font-mono mt-0.5">
                          {formData.title}
                        </p>
                        <p className="text-xs text-fg-subtle print:text-gray-600 mt-1 flex items-center gap-1.5">
                          <MapPin size={13} className="text-accent print:text-black" />
                          {formData.location}
                        </p>
                      </div>
                    </div>

                    {/* Contacts Strip */}
                    <div className="flex flex-col gap-1.5 text-xs font-mono text-fg-muted print:text-black self-stretch sm:self-auto sm:text-right">
                      <a
                        href={`mailto:${formData.email}`}
                        className="inline-flex items-center sm:justify-end gap-1.5 hover:text-accent transition-colors"
                      >
                        <Mail size={13} className="text-accent print:text-black" />
                        <span>{formData.email}</span>
                      </a>
                      <a
                        href={formData.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center sm:justify-end gap-1.5 hover:text-accent transition-colors"
                      >
                        <Github size={13} className="text-accent print:text-black" />
                        <span>github.com/yamkela-macwili</span>
                      </a>
                      <a
                        href={formData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center sm:justify-end gap-1.5 hover:text-accent transition-colors"
                      >
                        <Linkedin size={13} className="text-accent print:text-black" />
                        <span>linkedin.com/in/yamkela-macwili</span>
                      </a>
                      {formData.website && (
                        <a
                          href={formData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center sm:justify-end gap-1.5 hover:text-accent transition-colors"
                        >
                          <Globe size={13} className="text-accent print:text-black" />
                          <span>macwili.co.za</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="font-mono text-xs uppercase tracking-widest text-accent print:text-black font-bold flex items-center gap-1.5">
                      <Sparkles size={14} /> Professional Profile
                    </div>
                    <p className="text-xs sm:text-sm text-fg-secondary print:text-black leading-relaxed">
                      {formData.summary}
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-3">
                    <div className="font-mono text-xs uppercase tracking-widest text-accent print:text-black font-bold flex items-center gap-1.5">
                      <Layers size={14} /> Technical Arsenal &amp; Core Stack
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs font-mono">
                      {formData.skills.map((skillGroup) => (
                        <div
                          key={skillGroup.category}
                          className="p-2.5 rounded-xl bg-base print:bg-transparent border border-border print:border-black/20 flex flex-col justify-between"
                        >
                          <span className="font-bold text-fg print:text-black text-[11px] uppercase tracking-wider mb-1">
                            {skillGroup.category}
                          </span>
                          <span className="text-fg-muted print:text-black leading-relaxed text-[11px]">
                            {skillGroup.items.join(' · ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Projects */}
                  <div className="space-y-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-accent print:text-black font-bold flex items-center gap-1.5">
                      <Briefcase size={14} /> Featured Engineering Projects
                    </div>

                    <div className="space-y-3">
                      {formData.projects.map((proj) => (
                        <div
                          key={proj.id || proj.title}
                          className="p-4 rounded-xl bg-base print:bg-transparent border border-border print:border-black/20 space-y-2"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h3 className="text-sm font-bold text-fg print:text-black">
                              {proj.title}
                              <span className="text-xs font-mono font-normal text-fg-subtle print:text-gray-600 ml-2">
                                — {proj.category}
                              </span>
                            </h3>

                            <div className="flex items-center gap-3 font-mono text-[11px] text-fg-subtle print:text-black">
                              {proj.github && (
                                <a
                                  href={proj.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-accent transition-colors inline-flex items-center gap-1"
                                >
                                  GitHub <ExternalLink size={11} />
                                </a>
                              )}
                              {proj.link && (
                                <a
                                  href={proj.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-accent font-semibold text-accent print:text-black transition-colors inline-flex items-center gap-1"
                                >
                                  Live <ExternalLink size={11} />
                                </a>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-fg-secondary print:text-black leading-relaxed">
                            {proj.desc}
                          </p>

                          {proj.highlights && proj.highlights.length > 0 && (
                            <ul className="list-disc list-inside text-xs text-fg-muted print:text-black space-y-0.5">
                              {proj.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          )}

                          <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px] text-fg-subtle print:text-black">
                            {proj.tech.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-surface-raised print:bg-transparent border border-border print:border-black/20 text-fg-muted print:text-black"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-accent print:text-black font-bold flex items-center gap-1.5">
                      <Briefcase size={14} /> Professional Experience
                    </div>

                    <div className="space-y-3">
                      {formData.experience.map((exp) => (
                        <div
                          key={exp.id}
                          className="p-4 rounded-xl bg-base print:bg-transparent border border-border print:border-black/20 space-y-2"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                            <div>
                              <h3 className="text-sm font-bold text-fg print:text-black">{exp.role}</h3>
                              <p className="text-xs font-mono text-accent print:text-black">{exp.company}</p>
                            </div>
                            <div className="font-mono text-xs text-fg-subtle print:text-black shrink-0">
                              {exp.period} · {exp.location}
                            </div>
                          </div>

                          <p className="text-xs text-fg-secondary print:text-black leading-relaxed">
                            {exp.description}
                          </p>

                          <ul className="list-disc list-inside text-xs text-fg-muted print:text-black space-y-1">
                            {exp.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education & Certifications Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Education */}
                    <div className="space-y-3">
                      <div className="font-mono text-xs uppercase tracking-widest text-accent print:text-black font-bold flex items-center gap-1.5">
                        <GraduationCap size={14} /> Academic Education
                      </div>

                      {formData.education.map((ed) => (
                        <div
                          key={ed.id}
                          className="p-4 rounded-xl bg-base print:bg-transparent border border-border print:border-black/20 space-y-1"
                        >
                          <div className="text-sm font-bold text-fg print:text-black">{ed.degree}</div>
                          <div className="text-xs font-mono text-accent print:text-black">{ed.institution}</div>
                          <div className="text-[11px] font-mono text-fg-subtle print:text-black">{ed.period}</div>
                          <p className="text-xs text-fg-secondary print:text-black leading-relaxed pt-1">
                            {ed.details}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div className="space-y-3">
                      <div className="font-mono text-xs uppercase tracking-widest text-accent print:text-black font-bold flex items-center gap-1.5">
                        <Award size={14} /> Verified Credentials
                      </div>

                      <div className="space-y-2">
                        {formData.certifications.map((cert) => (
                          <div
                            key={cert.id}
                            className="p-3 rounded-xl bg-base print:bg-transparent border border-border print:border-black/20"
                          >
                            <div className="text-xs font-bold text-fg print:text-black">{cert.title}</div>
                            <div className="text-[11px] font-mono text-fg-subtle print:text-black flex items-center justify-between mt-0.5">
                              <span className="text-accent print:text-black">{cert.issuer}</span>
                              <span>{cert.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
