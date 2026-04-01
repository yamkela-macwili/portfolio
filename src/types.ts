export interface Project {
  id?: string;
  created_at?: string;
  slug: string;
  title: string;
  category: string;
  project_type?: string;
  projectType?: string;
  domains?: string[];
  desc: string;
  tech: string[];
  featured?: boolean;
  type: 'free' | 'premium';
  price?: string;
  link?: string;
  github?: string;
  architecture?: string;
  challenges?: string;
  performance?: string;
  content?: string;
  stars?: string;
}

export interface BlogPost {
  id?: string;
  created_at?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read_time?: string;
  readTime?: string;
  category: string;
  content: string;
  featured?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  icon?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Languages' | 'Frameworks' | 'Databases' | 'Tools & Infra';
  icon?: string;
}
