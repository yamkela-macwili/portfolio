export interface CVExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  highlights: string[];
  techStack?: string[];
}

export interface CVEducation {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  details?: string;
}

export interface CVCertification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface CVProject {
  id: string;
  title: string;
  category?: string;
  period?: string;
  desc?: string;
  highlights: string[];
  tech: string[];
  github?: string;
  link?: string;
}

export interface CVSkillCategory {
  category: string;
  items: string[];
}

export interface CVProfile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  website: string;
  profileImage: string;
  summary: string;
  skills: CVSkillCategory[];
  experience: CVExperience[];
  projects: CVProject[];
  education: CVEducation[];
  certifications: CVCertification[];
  customPdfUrl?: string;
}

export const defaultCVData: CVProfile = {
  name: 'YAMKELA MACWILI',
  title: 'Junior Backend Developer',
  tagline: 'Python & Java Backend Systems · RESTful APIs · Data-Driven Architecture',
  location: 'Cape Town, South Africa',
  email: 'yamkela22y@gmail.com',
  phone: '+27 638595244',
  github: 'https://github.com/yamkela-macwili',
  linkedin: 'https://linkedin.com/in/yamkela-macwili-116442253',
  website: 'https://macwili.co.za',
  profileImage: '/profile.jpg',
  summary:
    'Junior Backend Developer with a strong foundation in Python and Java, focused on building scalable backend systems, APIs, and data driven applications. Passionate about intelligent automation, clean architecture, and solving real-world problems through code.',
  skills: [
    {
      category: 'Languages',
      items: ['Python', 'Java', 'SQL'],
    },
    {
      category: 'Frameworks & Tools',
      items: ['Flask', 'React', 'Git', 'Docker', 'REST APIs'],
    },
    {
      category: 'Concepts',
      items: ['Agile methodologies', 'Object-Oriented Programming', 'CI/CD', 'Database Design'],
    },
  ],
  experience: [
    {
      id: 'act-1',
      role: 'Peer Tutor',
      company: 'WeThinkCode_',
      location: 'Cape Town, South Africa',
      period: '09/2025 – Present',
      description: 'Mentoring and technical guidance for software engineering students.',
      highlights: [
        'Mentored and supported other students in Python and Java.',
        'Provided one-on-one guidance on debugging, coding best practices.',
      ],
      techStack: ['Python', 'Java', 'Algorithms', 'Code Review'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Job Intelligence Platform — Solo Project',
      category: 'Solo Project',
      period: '2026',
      tech: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Docker', 'Azure OpenAI'],
      highlights: [
        'Developed an AI-powered Job Intelligence Platform that analyzes CVs against job descriptions and generates personalized career insights',
        'Built RESTful APIs using FastAPI for handling CV uploads, job processing, and AI-driven analysis workflows',
        'Implemented PDF parsing using pdfplumber to process real-world CV formats and extract structured data',
        'Integrated NLP techniques (spaCy) and AI models to perform semantic matching and skill gap analysis',
        'Designed and managed PostgreSQL databases for storing CVs, job data, and analysis results',
        'Deployed full-stack application using Docker, Vercel, and Render',
      ],
      github: 'https://github.com/yamkela-macwili/Job-Intelligence-Platform',
      link: 'https://job-intelligence-platform.vercel.app',
    },
    {
      id: 'proj-2',
      title: 'AI Project Planner Agent - Contributor',
      category: 'Contributor',
      period: '2026',
      tech: ['FastAPI', 'LangChain', 'Python', 'AI Architecture'],
      highlights: [
        'Contributed to the development of an AI-powered system that transforms project ideas into structured development plans',
        'Assisted in backend API development using FastAPI for generating architecture and roadmap outputs',
      ],
      github: 'https://github.com/yamkela-macwili',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Software Development Programme',
      institution: 'WeThinkCode_',
      location: 'Cape Town, South Africa',
      period: 'Present',
      details: 'Comprehensive software development training focusing on systems architecture, Python, Java, testing, and modern team engineering practices.',
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Science',
      institution: 'Walter Sisulu University',
      location: 'Eastern Cape, South Africa',
      period: '2023',
      details: 'Mathematical, scientific, and computing foundations focusing on computational theory and analytical problem-solving.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Certified in Cybersecurity (CC)',
      issuer: 'ISC2',
      date: '2025',
      link: 'https://www.isc2.org',
    },
    {
      id: 'cert-2',
      title: 'Data Science & Machine Learning Foundations',
      issuer: 'Professional Certification',
      date: '2024',
      link: '#',
    },
  ],
};
