import { Skill, Education, Project, BlogPost, Certification } from './types';

export const posts: BlogPost[] = [
  {
    id: 'b2',
    slug: 'building-an-end-to-end-data-pipeline-with-airflow-and-postgres',
    title: 'Building an End-to-End Data Pipeline with Apache Airflow, PostgreSQL, and Great Expectations',
    excerpt: 'A walkthrough of an automated data pipeline for Brazilian e-commerce data, covering ingestion, data quality checks, and RFM customer segmentation.',
    date: '2026-04-15',
    readTime: '10 min read',
    category: 'Data Engineering',
    featured: true,
    content: `## Why E-Commerce Pipelines Require Strict Data Quality

The Olist Brazilian E-Commerce dataset contains related order, customer, payment, and product records. Bringing those records together reliably is essential for useful downstream analysis.

Without strict data quality gates and disciplined orchestration, downstream analytics suffer from silent data anomalies, orphaned order items, and skewed financial metrics.

In this post, I will break down how I engineered an end-to-end data pipeline using **Apache Airflow 3**, **PostgreSQL**, **Great Expectations**, and **Metabase** to transform raw transactional records into actionable customer behavior intelligence.

---

## Architectural Overview

The pipeline follows a staged ELT pattern designed for idempotency, strict data validation, and automated feature engineering:

\`\`\`mermaid
graph TD
    A[Raw Olist CSV Datasets] -->|Airflow 3 Ingestion| B[Raw Staging Tables in PostgreSQL]
    B -->|Great Expectations Checkpoints| C{Data Quality Gate}
    C -->|Pass| D[Staged SQL Transformations]
    C -->|Fail| E[Alert & Halt DAG Execution]
    D --> F[RFM Customer Segmentation Mart]
    F --> G[Metabase Analytical Dashboards]
\`\`\`

### Core Pipeline Stages

1. **Extraction and Ingestion**: Airflow DAG orchestrates batch ingestion of customer, order, payment, and product tables into dedicated PostgreSQL staging schemas.
2. **Quality Validation**: Great Expectations suite executes automated validation rules checking primary keys, null thresholds, timestamp consistency, and referential integrity.
3. **Transformation Layer**: Modular SQL transformation scripts normalize statuses, calculate delivery durations, and build analytics-ready dimensional models.
4. **RFM Feature Engineering**: Computes Recency, Frequency, and Monetary scores per customer segment.
5. **Serving Layer**: Pre-computed views queryable by Metabase dashboards for churn risk identification and lifetime value analysis.

---

## Establishing Data Quality Gates with Great Expectations

One of the primary goals of this project was preventing corrupted data from silently propagating into reporting dashboards. Instead of relying on manual spot checks, I incorporated **Great Expectations** assertions directly into the pipeline lifecycle:

- **Null Checks**: Ensuring mandatory identifiers like \`order_id\`, \`customer_id\`, and \`order_purchase_timestamp\` contain zero null values.
- **Value Ranges**: Verifying payment values and freight amounts are strictly non-negative numbers.
- **Status Enumerations**: Confirming order statuses conform strictly to allowed states (\`delivered\`, \`shipped\`, \`invoiced\`, \`canceled\`).
- **Referential Integrity**: Confirming all order items link to existing orders and registered sellers.

If any assertion fails its tolerance threshold, the Airflow task fails immediately, halting downstream transformations and preserving the integrity of downstream reporting.

---

## SQL Modeling & RFM Feature Engineering

Once raw data passes validation, SQL transformations aggregate transaction histories to calculate customer RFM metrics:

- **Recency**: Days elapsed since the customer's most recent purchase date relative to the pipeline reference date.
- **Frequency**: Total count of completed orders executed by the customer.
- **Monetary Value**: Cumulative monetary spend including product prices and freight charges.

These dimensions are then segmented into standard behavioral tiers: Champions, Loyal Customers, At Risk, and Dormant.

---

## Dashboarding & Serving with Metabase

The pipeline concludes with an automated serving layer connected to Metabase. Key analytical views include:

- High-value customer retention over calendar quarters.
- Average fulfillment delay correlated with customer satisfaction ratings.
- Regional distribution of order volume across Brazilian states.

By orchestrating the entire lifecycle through code, changes to validation rules or feature calculations can be version-controlled and tested reliably.

---

## Key Takeaways

1. **Idempotency matters**: Designing Airflow tasks that can be safely retried without creating duplicate records prevents countless operational headaches.
2. **Fail fast on bad data**: Catching schema drift and missing fields at the staging gate saves hours of debugging corrupted downstream dashboards.
3. **Pair engineering with business metrics**: Transforming raw order rows into RFM cohorts demonstrates the direct business utility of well-structured data engineering.`
  },
  {
    id: 'b1',
    slug: 'cors-chronicles-security-feature',
    title: 'CORS Chronicles: How a Simple Security Feature Nearly Broke My Web App',
    excerpt: 'A deep dive into debugging CORS issues during the deployment of a Job Intelligence Platform, exploring preflight requests, middleware order, and common pitfalls.',
    date: '2026-03-31',
    readTime: '8 min read',
    category: 'Web Development',
    featured: false,
    content: `I write about real challenges I encounter while building systems. Check out the full story here: https://www.macwili.co.za/blog/cors-chronicles-security-feature`
  }
];

export const projects: Project[] = [
  {
    id: 'p1',
    slug: 'job-intelligence-platform',
    title: 'Job Intelligence Platform',
    category: 'Full-Stack & AI',
    projectType: 'Full-Stack Application',
    domains: ['Full-Stack', 'AI Engineering', 'NLP', 'APIs'],
    desc: 'Full-stack AI platform that analyzes CVs against job descriptions, computes match alignment, identifies skill gaps, and generates structured learning roadmaps with an interactive React frontend.',
    problem: 'Job seekers often struggle to understand how well their CV matches a specific role. Most applications provide no actionable feedback, making it difficult to identify concrete skill gaps or know what to learn next.',
    solution: 'Built a full-stack platform with a React frontend, a FastAPI backend with NLP extraction routines, and Azure OpenAI integration to compare CV text with job specifications, calculate alignment scores, and generate skill roadmaps.',
    impact: 'Empowers users to make structured career decisions by identifying skill gaps and next steps with customized learning paths.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Azure OpenAI', 'Tailwind CSS'],
    architecture: 'Client-Server architecture with React SPA communicating via REST APIs to a containerized FastAPI backend, leveraging Azure OpenAI and PostgreSQL.',
    challenges: 'Extracting semantic structure from heterogeneous CV formats, managing token usage with LLM prompting, and handling CORS and secure auth.',
    performance: 'Optimized FastAPI asynchronous endpoints with prompt engineering and structured schema parsing.',
    featured: true,
    type: 'free',
    link: 'https://job-intelligence-platform.vercel.app',
    github: 'https://github.com/yamkela-macwili/Job-Intelligence-Platform'
  },
  {
    id: 'p-olist',
    slug: 'olist-customer-behavior-pipeline',
    title: 'Olist Customer Behavior Pipeline',
    category: 'Data Engineering',
    projectType: 'Data Engineering Pipeline',
    domains: ['Data Engineering', 'Airflow', 'ETL', 'PostgreSQL', 'Python', 'SQL', 'Metabase'],
    desc: 'End-to-end data pipeline based on the Olist Brazilian E-Commerce dataset featuring automated ingestion, data quality checks, SQL transformations, RFM customer behavior feature engineering, and an interactive Metabase dashboard.',
    problem: 'Raw e-commerce transaction data across distributed order, customer, and payment tables is unstructured for analytics, prone to silent data quality anomalies, and lacks automated segmentation for customer behavior insights.',
    solution: 'Engineered an automated end-to-end data pipeline using Apache Airflow 3 for orchestration, Great Expectations for automated schema and quality assertions, robust SQL transformations in PostgreSQL, and RFM (Recency, Frequency, Monetary) feature engineering to feed an interactive Metabase analytical dashboard.',
    impact: 'Automates ingestion, data quality checks, SQL transformations, and customer lifecycle segmentation for analysis.',
    tech: ['Apache Airflow 3', 'PostgreSQL', 'Python', 'SQL', 'Great Expectations', 'Metabase'],
    architecture: 'Airflow 3 DAG orchestrates ingestion tasks, triggers Great Expectations quality validations, executes staged PostgreSQL SQL transformations, computes RFM scores, and feeds Metabase dashboards.',
    challenges: 'Handling complex transaction relationships across multiple tables, ensuring strict data quality thresholds, and designing efficient SQL aggregations for RFM scoring.',
    performance: 'Automated end-to-end Airflow pipeline orchestration with Great Expectations validation gates and dimensional PostgreSQL modeling.',
    featured: true,
    type: 'free',
    github: 'https://github.com/yamkela-macwili/olist-customer-behavior-pipeline'
  },
  {
    id: 'p2',
    slug: 'ai-project-planner-agent',
    title: 'AI Project Planner Agent',
    category: 'AI Engineering & Automation',
    projectType: 'Intelligent AI Agent',
    domains: ['AI Engineering', 'LangChain', 'Automation', 'System Design'],
    desc: 'Collaborative AI agent that automates technical project scoping, architecture planning, and modular task breakdown.',
    problem: 'Turning a raw project idea into a structured, actionable plan is often time-consuming and unclear, especially for developers who need guidance on architecture, tools, and implementation steps.',
    solution: 'Contributed to an AI-powered planning agent that transforms high-level project ideas into structured development plans, including system architecture blueprints, tech stack recommendations, and step-by-step execution phases using LangChain and FastAPI.',
    impact: 'Accelerates the project planning process and helps developers move from idea to execution with clear architecture phases.',
    tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'System Architecture'],
    architecture: 'Modular agent architecture built with LangChain and FastAPI, executing structured decomposition prompts against OpenAI models.',
    challenges: 'Ensuring consistency and feasibility in generated technical blueprints while keeping prompt response latency low.',
    performance: 'Generates structured technical specification roadmaps and architecture breakdowns via LangChain decomposition.',
    featured: true,
    type: 'free'
  },
  {
    id: 'p3',
    slug: 'job-listing-aggregator',
    title: 'Job Listing Aggregator',
    category: 'Backend & Data Engineering',
    projectType: 'Data Ingestion & Pipeline',
    domains: ['Data Ingestion', 'Backend Architecture', 'Distributed Caching', 'PostgreSQL'],
    desc: 'High-throughput data ingestion pipeline and aggregation API that collects, deduplicates, and indexes job listings from multiple sources.',
    problem: 'Fragmented job data across various platforms makes it difficult to find relevant roles, resulting in duplicate entries, mismatched schemas, and high request latency.',
    solution: 'Developed a robust scraping engine and API aggregator with deduplication logic using Python, BeautifulSoup, and Scrapy, paired with Redis caching and PostgreSQL relational storage.',
    impact: 'Automated multi-source extraction, deduplication, and PostgreSQL relational indexing.',
    tech: ['Python', 'BeautifulSoup', 'Scrapy', 'Redis', 'PostgreSQL', 'REST APIs'],
    architecture: 'Scraper and API ingestion engine utilizing Redis as a fast deduplication key-value cache and PostgreSQL for relational indexing and queries.',
    challenges: 'Dynamic website DOM changes, anti-scraping countermeasures, and high-volume data deduplication.',
    performance: 'Multi-threaded scraping and indexing engine utilizing Redis caching for deduplication and PostgreSQL relational queries.',
    featured: true,
    type: 'free'
  },
  {
    id: 'p4',
    slug: 'market-data-downloader',
    title: 'Market Data Downloader',
    category: 'Backend & Performance',
    projectType: 'Async Systems',
    domains: ['Backend Performance', 'Async I/O', 'Caching', 'Data Pipelines'],
    desc: 'Optimized asynchronous utility for low-latency market data retrieval, intelligent caching, and local storage.',
    problem: 'API rate limits and slow network responses hinder real-time data analysis and create bottlenecks during batch processing.',
    solution: 'Implemented an intelligent caching layer and asynchronous request handling with Python Asyncio and Redis to batch queries and store data efficiently in SQLite.',
    impact: 'Protected against rate-limit bottlenecks and provided dependable local data access for downstream analytics.',
    tech: ['Python', 'Asyncio', 'Redis', 'SQLite', 'REST APIs'],
    architecture: 'Async event loop architecture with Redis caching for rate-limit protection and SQLite for structured local time-series storage.',
    challenges: 'Graceful backoff when hitting provider rate limits and managing memory footprint during high-volume streaming.',
    performance: 'Asynchronous event loop utilizing Redis caching for rate-limit protection and SQLite storage.',
    featured: false,
    type: 'free'
  }
];

export const defaultSkills: Skill[] = [
  // Languages
  { id: '1', name: 'Python', category: 'Languages' },
  { id: '2', name: 'Java', category: 'Languages' },
  { id: '3', name: 'JavaScript', category: 'Languages' },
  { id: '4', name: 'TypeScript', category: 'Languages' },
  { id: '5', name: 'SQL', category: 'Languages' },
  { id: '6', name: 'HTML5/CSS3', category: 'Languages' },

  // Frameworks & Backend / Frontend
  { id: '7', name: 'FastAPI', category: 'Backend' },
  { id: '8', name: 'Flask', category: 'Backend' },
  { id: '9', name: 'React', category: 'Frontend' },
  { id: '10', name: 'Tailwind CSS', category: 'Frontend' },
  { id: '11', name: 'LangChain', category: 'AI Engineering' },

  // Databases & Storage
  { id: '12', name: 'PostgreSQL', category: 'Databases' },
  { id: '13', name: 'MySQL', category: 'Databases' },
  { id: '14', name: 'SQLite', category: 'Databases' },
  { id: '15', name: 'Redis', category: 'Databases' },

  // Data Engineering & Tools
  { id: '16', name: 'Git & GitHub', category: 'Tools & DevOps' },
  { id: '17', name: 'Docker', category: 'Tools & DevOps' },
  { id: '18', name: 'Apache Airflow 3', category: 'Data Engineering' },
  { id: '19', name: 'Metabase', category: 'Data Engineering' },
  { id: '20', name: 'Great Expectations', category: 'Data Engineering' },
  { id: '21', name: 'pgAdmin 4', category: 'Databases' },
  { id: '22', name: 'Linux/Bash', category: 'Tools & DevOps' },
  { id: '23', name: 'REST APIs', category: 'Backend' },
  { id: '24', name: 'Azure OpenAI', category: 'AI Engineering' },
];

export const defaultEducation: Education[] = [
  {
    id: 'edu-1',
    degree: 'Software Development Programme',
    institution: 'WeThinkCode_',
    period: 'Present',
    description: 'Software development training covering object-oriented programming, Python, Java, and collaborative engineering practices.',
  },
  {
    id: 'edu-2',
    degree: 'Bachelor of Science',
    institution: 'Walter Sisulu University',
    period: '2023',
    description: 'Mathematical, computational, and scientific foundations with a focus on analytical problem-solving.',
  },
];

export const defaultCertifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Azure Fundamentals',
    issuer: 'Microsoft',
    date: '2026',
  },
  {
    id: 'cert-2',
    title: 'GenAI Course for Software Engineers',
    issuer: 'WeThinkCode_',
    date: '2026',
  },
];
