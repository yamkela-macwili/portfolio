export interface CVExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface CVEducation {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  details: string;
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
  category: string;
  period?: string;
  desc: string;
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
  name: 'Yamkela Macwili',
  title: 'Full-Stack Software Engineer & Data Architect',
  tagline: 'Applied Statistics Graduate · Distributed Systems · Scalable Web Applications · ETL Pipelines',
  location: 'Cape Town, South Africa (UTC+2)',
  email: 'yamkela22y@gmail.com',
  phone: '+27 72 000 0000',
  github: 'https://github.com/yamkela-macwili',
  linkedin: 'https://www.linkedin.com/in/yamkela-macwili-116442253/',
  website: 'https://macwili.co.za',
  profileImage: '/profile.jpg',
  summary:
    'Full-Stack Software Engineer with academic grounding in Applied Statistics (BSc, 2019-2022). Specializing in building resilient server-side architectures, RESTful APIs, relational data modeling, automated ETL/data pipelines with Apache Airflow, and modern high-performance React/TypeScript user interfaces. Proven ability to design end-to-end distributed systems focusing on data integrity, deterministic processing, and production reliability.',
  skills: [
    {
      category: 'Languages & Core',
      items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'HTML5/CSS3'],
    },
    {
      category: 'Backend & APIs',
      items: ['FastAPI', 'Flask', 'RESTful API Design', 'System Architecture', 'Microservices', 'Async I/O'],
    },
    {
      category: 'Data Engineering',
      items: ['Apache Airflow 3', 'Metabase', 'pgAdmin 4', 'Great Expectations', 'ETL Pipelines', 'RFM Feature Engineering', 'Data Quality Gates'],
    },
    {
      category: 'Frontend & UI',
      items: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'State Management', 'Framer Motion'],
    },
    {
      category: 'Databases & Caching',
      items: ['PostgreSQL', 'MySQL', 'Redis (Deduplication/Caching)', 'SQLite', 'Database Indexing'],
    },
    {
      category: 'AI & Machine Learning',
      items: ['Azure OpenAI', 'OpenAI API', 'LangChain', 'RAG Architectures', 'Prompt Engineering', 'NLP Token Parsing'],
    },
    {
      category: 'DevOps & Tools',
      items: ['Docker', 'Linux/Bash', 'Git/GitHub', 'CI/CD Pipelines', 'Vercel Deployment'],
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Full-Stack Software Engineer (Independent / Projects)',
      company: 'Engineering Portfolio & Systems Development',
      location: 'Cape Town, South Africa',
      period: '2023 - Present',
      description: 'Designing, architecting, and deploying full-stack web applications, asynchronous data ingestion services, and LLM-assisted tools with rigorous focus on uptime and clean API contracts.',
      highlights: [
        'Built full-stack AI platform (Job Intelligence Platform) utilizing FastAPI, React, and Azure OpenAI to extract structured CV data and compute deterministic match scores.',
        'Engineered an automated data pipeline on Apache Airflow 3 for 100k+ Brazilian e-commerce records, integrating Great Expectations quality gates and RFM customer segmentation.',
        'Developed a high-throughput job listing aggregator with Redis caching and PostgreSQL, indexing 5,000+ records daily with sub-second retrieval latency.',
      ],
      techStack: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Airflow 3', 'Docker', 'Redis'],
    },
    {
      id: 'exp-2',
      role: 'Statistical Analyst & Quantitative Modeling',
      company: 'Tertiary Academic & Applied Projects',
      location: 'Cape Town, South Africa',
      period: '2019 - 2022',
      description: 'Applied probabilistic theory, statistical analysis, and quantitative modeling methodologies across real-world datasets.',
      highlights: [
        'Conducted advanced hypothesis testing, multivariate regression analysis, and computational time-series modeling.',
        'Synthesized complex quantitative metrics into clear, actionable reporting dashboards and visual models.',
        'Formulated rigorous data validation logic to identify anomalies, skewness, and sample bias in multi-source data.',
      ],
      techStack: ['Applied Statistics', 'R', 'Python', 'SQL', 'Probability Theory', 'Data Analytics'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Job Intelligence Platform',
      category: 'Full-Stack Application & AI Engineering',
      period: '2026',
      desc: 'Full-stack AI platform that parses unstructured CVs, evaluates compatibility against job requirements, and generates personalized learning roadmaps.',
      highlights: [
        'Engineered client-server SPA with React and FastAPI achieving < 1.8s analysis latency.',
        'Integrated Azure OpenAI for structured token extraction and skill gap quantification.',
      ],
      tech: ['FastAPI', 'React', 'TypeScript', 'Azure OpenAI', 'PostgreSQL', 'Tailwind CSS'],
      github: 'https://github.com/yamkela-macwili/Job-Intelligence-Platform',
      link: 'https://job-intelligence-platform.vercel.app',
    },
    {
      id: 'proj-2',
      title: 'Olist Customer Behavior Pipeline',
      category: 'Data Engineering & Analytics',
      period: '2026',
      desc: 'Automated ELT data pipeline orchestrating raw transactional ingestion, data validation suites, SQL transformations, and Metabase dashboards.',
      highlights: [
        'Configured Apache Airflow 3 DAG with zero-error idempotent retry mechanisms.',
        'Built Great Expectations checkpoints to validate schema constraints across 100,000+ orders.',
      ],
      tech: ['Apache Airflow 3', 'PostgreSQL', 'Great Expectations', 'Python', 'SQL', 'Metabase'],
      github: 'https://github.com/yamkela-macwili/olist-customer-behavior-pipeline',
    },
    {
      id: 'proj-3',
      title: 'AI Project Planner Agent',
      category: 'AI Engineering & Automation',
      period: '2026',
      desc: 'Collaborative AI system that decomposes complex project briefs into comprehensive architecture blueprints and execution phases.',
      highlights: [
        'Utilized LangChain and FastAPI to generate structured development phases in seconds.',
        'Reduced early-stage technical planning and scoping time by over 60%.',
      ],
      tech: ['Python', 'LangChain', 'FastAPI', 'OpenAI API', 'System Design'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'BSc in Applied Statistics',
      institution: 'Higher Education / Tertiary Degree',
      period: '2019 - 2022',
      location: 'South Africa',
      details: 'Comprehensive study of statistical inference, probability distributions, quantitative data modeling, regression methodologies, and computational analytics.',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AZ-900: Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      date: '2026',
      link: '#',
    },
    {
      id: 'cert-2',
      title: 'WeThinkCode_ GenAI Course for Software Engineers',
      issuer: 'WeThinkCode',
      date: '2026',
      link: '#',
    },
    {
      id: 'cert-3',
      title: 'Google AI Essentials',
      issuer: 'Google',
      date: '2026',
      link: '#',
    },
  ],
};
