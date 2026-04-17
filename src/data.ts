import { Skill, Education, Project, BlogPost, Certification } from './types';

export const posts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'cors-chronicles-security-feature',
    title: 'CORS Chronicles: How a Simple Security Feature Nearly Broke My Web App',
    excerpt: 'A deep dive into debugging CORS issues during the deployment of a Job Intelligence Platform, exploring preflight requests, middleware order, and common pitfalls.',
    date: '2026-03-31',
    readTime: '8 min read',
    category: 'Web Development',
    featured: true,
    content: `I write about real challenges I encounter while building systems. Check out the full story here: https://www.macwili.co.za/blog/cors-chronicles-security-feature`
  }
];

export const projects: Project[] = [
  {
    id: 'p1',
    slug: 'Job Intel',
    title: 'Job Intelligence Platform',
    category: 'AI & Backend',
    desc: 'AI-powered platform that analyzes how well a CV matches a job and generates a personalized learning roadmap.',
    problem: 'Job seekers often struggle to understand how well their CV matches a specific role. Most applications provide no feedback, making it difficult to identify skill gaps or know what to learn next.',
    solution: 'Developed an AI-powered platform that analyzes CVs against job descriptions to generate a match score, identify missing skills with priority levels, and provide a personalized learning roadmap. The system leverages NLP and intelligent backend processing to extract and compare unstructured data.',
    impact: 'Empowers users to make data-driven career decisions by clearly identifying skill gaps and next steps. Transforms job searching from a trial-and-error process into a structured, insight-driven experience.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Azure OpenAI'],
    featured: true,
    type: 'free',
    link: 'https://job-intelligence-platform.vercel.app',
    github: 'https://github.com/yamkela-macwili/Job-Intelligence-Platform'
  },
  {
    id: 'p2',
    slug: 'ai-project-planner-agent',
    title: 'AI Project Planner Agent',
    category: 'AI & Automation',
    desc: 'Collaborative AI agent that automates project planning and task breakdown.',
    problem: 'Turning a raw project idea into a structured, actionable plan is often time-consuming and unclear, especially for developers who need guidance on architecture, tools, and implementation steps.',
    solution: 'Contributed to an AI-powered planning agent that transforms high-level project ideas into structured development plans, including system architecture, tech stack recommendations, and step-by-step execution phases.',
    impact: 'Accelerates the project planning process and helps developers move from idea to execution faster, improving productivity and reducing uncertainty in early-stage development.',
    tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
    featured: true,
    type: 'free'
  },
  {
    id: 'p3',
    slug: 'job-listing-aggregator',
    title: 'Job Listing Aggregator',
    category: 'Backend & Data',
    desc: 'High-performance data pipeline that aggregates job listings from multiple sources.',
    problem: 'Fragmented job data across various platforms makes it hard for users to find relevant roles.',
    solution: 'Developed a robust scraping engine and API aggregator with deduplication logic.',
    impact: 'Aggregates 5,000+ listings daily with 99% uptime.',
    tech: ['Python', 'BeautifulSoup', 'Scrapy', 'Redis', 'PostgreSQL'],
    featured: true,
    type: 'free'
  },
  {
    id: 'p4',
    slug: 'market-data-downloader',
    title: 'Market Data Downloader',
    category: 'Backend & Performance',
    desc: 'Optimized utility for high-frequency market data retrieval and storage.',
    problem: 'API rate limits and slow network responses hinder real-time data analysis.',
    solution: 'Implemented an intelligent caching layer and asynchronous request handling.',
    impact: 'Improved data retrieval speed by 3x and eliminated rate-limit bottlenecks.',
    tech: ['Python', 'Asyncio', 'Redis', 'SQLite'],
    featured: true,
    type: 'free'
  }
];

export const defaultSkills: Skill[] = [
  // Backend
  { id: '1', name: 'Python', category: 'Languages', icon: 'python' },
  { id: '2', name: 'FastAPI', category: 'Frameworks', icon: 'fastapi' },
  { id: '3', name: 'Flask', category: 'Frameworks', icon: 'flask' },
  
  // Frontend
  { id: '4', name: 'React', category: 'Frameworks', icon: 'react' },
  { id: '5', name: 'JavaScript', category: 'Languages', icon: 'javascript' },
  { id: '6', name: 'HTML', category: 'Languages', icon: 'html' },
  { id: '7', name: 'CSS', category: 'Languages', icon: 'css' },
  
  // Database
  { id: '8', name: 'PostgreSQL', category: 'Databases', icon: 'postgresql' },
  { id: '9', name: 'SQLite', category: 'Databases', icon: 'sqlite' },
  
  // Tools
  { id: '10', name: 'Git', category: 'Tools & Infra', icon: 'git' },
  { id: '11', name: 'Docker', category: 'Tools & Infra', icon: 'docker' },
  { id: '12', name: 'Vercel', category: 'Tools & Infra', icon: 'vercel' },
];

export const concepts = [
  'REST APIs',
  'System Design',
  'Caching',
  'Agile Development',
  'Intelligent Automation'
];

export const defaultEducation: Education[] = [
  {
    id: '1',
    degree: 'BSc in Applied Statistics',
    institution: 'University of Cape Town',
    period: '2019 — 2022',
    description: 'Focused on statistical modeling, data analysis, and computational mathematics.',
    icon: 'graduation-cap'
  }
];

export const defaultCertifications: Certification[] = [
  {
    id: 'c1',
    title: 'AZ-900: Microsoft Azure Fundamentals',
    issuer: 'Microsoft',
    date: '2026',
    link: '#'
  }
];
