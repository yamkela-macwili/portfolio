-- 1. Add columns if they don't exist (Supabase/PostgreSQL)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='problem') THEN
        ALTER TABLE projects ADD COLUMN problem TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='solution') THEN
        ALTER TABLE projects ADD COLUMN solution TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='impact') THEN
        ALTER TABLE projects ADD COLUMN impact TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='github') THEN
        ALTER TABLE projects ADD COLUMN github TEXT;
    END IF;
END $$;

-- 2. Update Job Intelligence Platform
UPDATE projects
SET 
    problem = 'Job seekers often struggle to understand how well their CV matches a specific role. Most applications provide no feedback, making it difficult to identify skill gaps or know what to learn next.',
    solution = 'Developed an AI-powered platform that analyzes CVs against job descriptions to generate a match score, identify missing skills with priority levels, and provide a personalized learning roadmap. The system leverages NLP and intelligent backend processing to extract and compare unstructured data.',
    impact = 'Empowers users to make data-driven career decisions by clearly identifying skill gaps and next steps. Transforms job searching from a trial-and-error process into a structured, insight-driven experience.'
WHERE slug = 'job-intelligence-platform';

-- 3. Update AI Project Planner Agent
UPDATE projects
SET 
    problem = 'Turning a raw project idea into a structured, actionable plan is often time-consuming and unclear, especially for developers who need guidance on architecture, tools, and implementation steps.',
    solution = 'Contributed to an AI-powered planning agent that transforms high-level project ideas into structured development plans, including system architecture, tech stack recommendations, and step-by-step execution phases.',
    impact = 'Accelerates the project planning process and helps developers move from idea to execution faster, improving productivity and reducing uncertainty in early-stage development.'
WHERE slug = 'ai-project-planner';
