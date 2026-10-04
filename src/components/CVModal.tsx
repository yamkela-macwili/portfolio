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
  FolderOpen,
  Phone,
  FileDown,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import { CVProfile, defaultCVData } from '../data/defaultCV';
import { generateResumePdf } from '../utils/generatePdf';

export default function CVModal() {
  const { user } = useAuth();
  const { cvData, updateCV, resetCV, isCVModalOpen, closeCVModal, openImageModal, openDriveModal } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CVProfile>(cvData);
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');
  const printRef = useRef<HTMLDivElement>(null);

  // Sync form data when cvData updates or modal opens
  React.useEffect(() => {
    if (isCVModalOpen) {
      setFormData(cvData);
      setShowDownloadMenu(false);
    }
  }, [isCVModalOpen, cvData]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setShowDownloadMenu(false);

    // If user has a direct custom PDF file uploaded or synced from Drive, download directly
    if (formData.customPdfUrl && formData.customPdfUrl.startsWith('data:application/pdf')) {
      const link = document.createElement('a');
      link.href = formData.customPdfUrl;
      link.download = `${formData.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    try {
      setIsGeneratingPdf(true);
      generateResumePdf(formData);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleExportJSON = () => {
    setShowDownloadMenu(false);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${formData.name.toLowerCase().replace(/\s+/g, '_')}_resume.json`);
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
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.name && parsed.skills) {
          setFormData(parsed);
          updateCV(parsed);
        } else {
          alert('Invalid CV JSON structure');
        }
      } catch (err) {
        alert('Could not parse JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveEdit = () => {
    updateCV(formData);
    setIsEditing(false);
    setActiveTab('preview');
  };

  const handleReset = () => {
    if (window.confirm('Reset CV to default Yamkela Macwili resume data?')) {
      resetCV();
      setFormData(defaultCVData);
      setIsEditing(false);
    }
  };

  const handleCopyText = () => {
    const plainText = `
${formData.name}
${formData.email} | ${formData.phone || ''} | ${formData.location}
LinkedIn: ${formData.linkedin}
GitHub: ${formData.github}
Portfolio: ${formData.website}

PROFESSIONAL SUMMARY
${formData.summary}

TECHNICAL SKILLS
${formData.skills.map((s) => `${s.category}: ${s.items.join(', ')}`).join('\n')}

PROJECT EXPERIENCE
${formData.projects
  .map(
    (p) => `
${p.title} (${p.period || ''})
${p.tech && p.tech.length > 0 ? `Tech: ${p.tech.join(', ')}` : ''}
${p.highlights.map((h) => `• ${h}`).join('\n')}
`
  )
  .join('')}

EDUCATION
${formData.education
  .map(
    (ed) => `
${ed.degree} ${ed.period ? `(${ed.period})` : ''}
${ed.institution}${ed.location ? `, ${ed.location}` : ''}
`
  )
  .join('')}

ADDITIONAL ACTIVITIES
${formData.experience
  .map(
    (e) => `
${e.role} ${e.period ? `(${e.period})` : ''}
${e.company}${e.location ? ` | ${e.location}` : ''}
${e.highlights.map((h) => `• ${h}`).join('\n')}
`
  )
  .join('')}
    `.trim();

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isCVModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto cv-modal-overlay">
          {/* Backdrop for Screen (hidden during print) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCVModal}
            className="fixed inset-0 bg-black/85 backdrop-blur-md print:hidden"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden z-10 cv-modal-card"
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
                    {formData.name} <span className="text-fg-subtle font-normal font-mono text-xs">/ Resume Document</span>
                  </h2>
                  <p className="text-[11px] font-mono text-accent">
                    {isEditing ? 'Editing Mode (Changes will be saved locally)' : 'Standard 1-Page Document Format'}
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
                          className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-fg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Edit resume contents"
                        >
                          <Edit3 size={13} className="text-accent" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => openDriveModal('resume')}
                          className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-fg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Sync resume/photo from Google Drive"
                        >
                          <FolderOpen size={13} className="text-accent" />
                          <span>Drive Sync</span>
                        </button>
                      </>
                    )}

                    {/* Download Dropdown / Buttons */}
                    <div className="relative">
                      <div className="inline-flex rounded-lg shadow-glow overflow-hidden">
                        <button
                          onClick={handleDownloadPDF}
                          disabled={isGeneratingPdf}
                          className="px-3.5 py-1.5 bg-accent text-on-accent hover:bg-accent-light text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                          title="Download as PDF file"
                        >
                          {isGeneratingPdf ? (
                            <>
                              <Loader2 size={13} className="animate-spin" />
                              <span>Generating PDF...</span>
                            </>
                          ) : (
                            <>
                              <FileDown size={13} />
                              <span>Download PDF</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                          className="px-2 py-1.5 bg-accent-dark text-white hover:bg-accent transition-colors cursor-pointer border-l border-accent"
                          title="More download options"
                        >
                          <ChevronDown size={14} className={showDownloadMenu ? 'rotate-180 transition-transform' : 'transition-transform'} />
                        </button>
                      </div>

                      {/* Download Options Menu */}
                      {showDownloadMenu && (
                        <div className="absolute right-0 mt-2 w-52 bg-surface border border-border rounded-xl shadow-2xl z-30 py-1.5 font-mono text-xs">
                          <button
                            onClick={handleDownloadPDF}
                            className="w-full px-3.5 py-2 text-left text-fg hover:bg-surface-raised flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <FileDown size={14} className="text-accent" />
                            <div>
                              <div className="font-semibold text-fg">Download PDF (.pdf)</div>
                              <div className="text-[10px] text-fg-subtle">Formatted 1-page document</div>
                            </div>
                          </button>

                          <button
                            onClick={handleExportJSON}
                            className="w-full px-3.5 py-2 text-left text-fg hover:bg-surface-raised flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <Download size={14} className="text-accent" />
                            <div>
                              <div className="font-semibold text-fg">Download JSON (.json)</div>
                              <div className="text-[10px] text-fg-subtle">Raw structured data</div>
                            </div>
                          </button>

                          <div className="border-t border-border my-1" />

                          <button
                            onClick={() => {
                              setShowDownloadMenu(false);
                              handlePrint();
                            }}
                            className="w-full px-3.5 py-2 text-left text-fg hover:bg-surface-raised flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <Printer size={14} className="text-fg-subtle" />
                            <div>
                              <div className="font-semibold text-fg">Print Document</div>
                              <div className="text-[10px] text-fg-subtle">Browser print preview</div>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Quick Print Button */}
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-fg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Print or Save as PDF via Browser"
                    >
                      <Printer size={13} className="text-accent" />
                      <span>Print</span>
                    </button>

                    {/* Copy Text Button */}
                    <button
                      onClick={handleCopyText}
                      className="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-fg-muted hover:text-fg text-xs font-mono transition-colors cursor-pointer"
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
                  </>
                )}

                {activeTab === 'edit' && (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="px-3.5 py-1.5 rounded-lg bg-accent text-on-accent hover:bg-accent-light text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Check size={13} /> Save Changes
                    </button>

                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setActiveTab('preview');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-border text-fg-muted hover:text-fg text-xs font-mono transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-3 py-1.5 rounded-lg bg-danger-subtle text-danger hover:bg-danger/20 text-xs font-mono transition-colors cursor-pointer"
                      title="Reset to default resume"
                    >
                      <RotateCcw size={13} />
                    </button>
                  </>
                )}

                {/* Close Button */}
                <button
                  onClick={closeCVModal}
                  className="p-1.5 rounded-lg bg-surface hover:bg-surface-hover border border-border text-fg-subtle hover:text-fg transition-colors ml-1 cursor-pointer"
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
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="p-4 rounded-xl bg-base border border-border flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-fg">Resume Customizer</h3>
                      <p className="text-xs text-fg-subtle">
                        Modify any section below to update your resume. Click "Save Changes" when done.
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
                        <label className="block text-[11px] font-mono text-fg-subtle mb-1">Phone</label>
                        <input
                          type="text"
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-fg-subtle mb-1">LinkedIn URL</label>
                        <input
                          type="text"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-fg-subtle mb-1">GitHub URL</label>
                        <input
                          type="text"
                          value={formData.github}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-fg-subtle mb-1">Portfolio URL</label>
                        <input
                          type="text"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-fg-subtle mb-1">Professional Summary</label>
                      <textarea
                        rows={3}
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-fg font-sans focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* PREVIEW & PRINTABLE RESUME (Exact structure of user's uploaded resume) */
                <div
                  ref={printRef}
                  id="printable-cv"
                  className="max-w-3xl mx-auto bg-white text-slate-900 border border-slate-200 print:border-none p-8 sm:p-12 rounded-xl print:rounded-none shadow-xl print:shadow-none space-y-6 font-sans cv-printable-area"
                >
                  {/* RESUME HEADER */}
                  <div className="space-y-1.5 pb-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-teal-700 uppercase">
                      {formData.name}
                    </h1>
                    <div className="text-xs text-slate-700 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans">
                      <a href={`mailto:${formData.email}`} className="hover:underline text-teal-800">
                        {formData.email}
                      </a>
                      {formData.phone && (
                        <>
                          <span className="text-slate-400">|</span>
                          <span>{formData.phone}</span>
                        </>
                      )}
                      <span className="text-slate-400">|</span>
                      <span>{formData.location}</span>
                    </div>
                    <div className="text-xs text-slate-700 flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
                      {formData.linkedin && (
                        <div>
                          <span className="font-semibold text-slate-800">LinkedIn:</span>{' '}
                          <a
                            href={formData.linkedin.startsWith('http') ? formData.linkedin : `https://${formData.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-700 hover:underline"
                          >
                            {formData.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')}
                          </a>
                        </div>
                      )}
                      {formData.github && (
                        <div>
                          <span className="font-semibold text-slate-800">Github:</span>{' '}
                          <a
                            href={formData.github.startsWith('http') ? formData.github : `https://${formData.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-700 hover:underline"
                          >
                            {formData.github}
                          </a>
                        </div>
                      )}
                      {formData.website && (
                        <div>
                          <span className="font-semibold text-slate-800">Portfolio:</span>{' '}
                          <a
                            href={formData.website.startsWith('http') ? formData.website : `https://${formData.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-700 hover:underline"
                          >
                            {formData.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 1. PROFESSIONAL SUMMARY */}
                  <div className="space-y-1.5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 border-b border-teal-600 pb-0.5">
                      Professional Summary
                    </h2>
                    <p className="text-xs text-slate-800 leading-relaxed italic">
                      {formData.summary}
                    </p>
                  </div>

                  {/* 2. TECHNICAL SKILLS */}
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 border-b border-teal-600 pb-0.5">
                      Technical Skills
                    </h2>
                    <div className="space-y-1 text-xs text-slate-800">
                      {formData.skills.map((skillGroup) => (
                        <div key={skillGroup.category} className="leading-normal">
                          <span className="font-bold text-slate-900">{skillGroup.category}:</span>{' '}
                          <span>{skillGroup.items.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. PROJECT EXPERIENCE */}
                  <div className="space-y-3">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 border-b border-teal-600 pb-0.5">
                      Project Experience
                    </h2>

                    <div className="space-y-3">
                      {formData.projects.map((proj) => (
                        <div key={proj.id || proj.title} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900">{proj.title}</span>
                            {proj.period && <span className="text-slate-600 font-medium">{proj.period}</span>}
                          </div>

                          {proj.tech && proj.tech.length > 0 && (
                            <div className="text-[11px] text-slate-700 italic">
                              <span className="font-semibold not-italic">Tech:</span> {proj.tech.join(', ')}
                            </div>
                          )}

                          {proj.highlights && proj.highlights.length > 0 && (
                            <ul className="list-disc list-outside ml-4 text-[11px] text-slate-800 space-y-1 leading-snug pt-0.5">
                              {proj.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. EDUCATION */}
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 border-b border-teal-600 pb-0.5">
                      Education
                    </h2>

                    <div className="space-y-2">
                      {formData.education.map((ed) => (
                        <div key={ed.id || ed.degree} className="text-xs space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{ed.degree}</span>
                            {ed.period && <span className="text-slate-600 font-medium">{ed.period}</span>}
                          </div>
                          <div className="text-slate-700 italic">
                            {ed.institution}{ed.location ? `, ${ed.location}` : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. ADDITIONAL ACTIVITIES */}
                  {formData.experience && formData.experience.length > 0 && (
                    <div className="space-y-2">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 border-b border-teal-600 pb-0.5">
                        Additional Activities
                      </h2>

                      <div className="space-y-2">
                        {formData.experience.map((exp) => (
                          <div key={exp.id || exp.role} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-900">{exp.role}</span>
                              {exp.period && <span className="text-slate-600 font-medium">{exp.period}</span>}
                            </div>
                            <div className="text-xs text-slate-700 italic">
                              {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                            </div>
                            {exp.highlights && exp.highlights.length > 0 && (
                              <ul className="list-disc list-outside ml-4 text-[11px] text-slate-800 space-y-0.5 leading-snug pt-0.5">
                                {exp.highlights.map((h, i) => (
                                  <li key={i}>{h}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Page Footer Marker */}
                  <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono">
                    Page 1
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
