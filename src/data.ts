import { Skill, Education } from './types';

export const posts: any[] = [
  {
    id: 'b1',
    slug: 'the-cors-chronicles',
    title: 'The CORS Chronicles: How a Simple Security Feature Nearly Broke My Web App',
    excerpt: 'A deep dive into debugging CORS issues during the deployment of a Job Intelligence Platform, exploring preflight requests, middleware order, and common pitfalls.',
    date: '2026-03-31',
    readTime: '8 min read',
    category: 'Web Development',
    featured: true,
    content: `# The CORS Chronicles: How a Simple Security Feature Nearly Broke My Web App

## Introduction

If you've ever worked with web development, you've probably encountered CORS (Cross-Origin Resource Sharing) at least once. For me, it happened during the final deployment of my Job Intelligence Platform—and boy, was it a learning experience.

This is the story of how I spent hours debugging a backend that was working perfectly, only to discover the issue wasn't with my code at all. It was with browser security policies I didn't fully understand.

---

## The Problem

It started innocently enough. The backend API was responding beautifully:
- ✅ \`/health\` endpoint returned 200 OK
- ✅ \`/api/v1/jobs\` endpoint returned 201 Created
- ✅ All endpoints were tested and verified manually

But when my React frontend tried to upload a CV file, I got this error:

\`\`\`
Cross-Origin Request Blocked: The Same Origin Policy disallows reading 
the remote resource at https://job-intel-api.onrender.com/api/v1/cv/upload. 
(Reason: CORS header 'Access-Control-Allow-Origin' missing). 
Status code: 201.
\`\`\`

The most confusing part? **The status code was 201—success!** But the browser was still blocking it.

### The Initial Confusion

I spent the first 2 hours thinking:
- Maybe my backend wasn't deployed correctly?
- Maybe there's a network issue?
- Maybe Docker is misconfigured?

No, no, and no. The backend was fine. The problem was CORS.

---

## What is CORS (And Why Does It Exist)?

### The Security Problem

Imagine you visit a malicious website. Without CORS, that website could:
1. Make requests to your bank's website on your behalf
2. Read your account information
3. Transfer money from your account
4. All without your knowledge

This is called **Cross-Site Request Forgery (CSRF)**.

### The Solution: CORS

CORS is a browser security feature that says:

> "Hey website! Before I let you make a request to a different domain, I need permission from that domain."

This is done through HTTP headers:

\`\`\`
Origin: https://frontend.com
Access-Control-Allow-Origin: https://frontend.com
\`\`\`

**Without these headers, the browser blocks the request—even if the request succeeded!**

---

## The Root Cause of My Issue

### What I Had

I configured CORS like this:

\`\`\`python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
\`\`\`

This looks correct, right? "Allow everything" should work...

### What I Didn't Understand

**Browser preflight requests!**

When you try to upload a file with \`multipart/form-data\`, the browser first sends an **OPTIONS request** (called a preflight request):

\`\`\`
OPTIONS /api/v1/cv/upload HTTP/1.1
Origin: https://job-intelligence-platform.vercel.app
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type
\`\`\`

The backend **must** respond with:

\`\`\`
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://job-intelligence-platform.vercel.app
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
\`\`\`

**Only if the preflight succeeds, does the browser send the actual POST request.**

### My Mistake

I assumed the FastAPI CORS middleware would handle this automatically. It does—**but only if the route exists!**

My OPTIONS handler had dependencies (database session, file validation) that were rejecting the request with a 400 error.

Browser sees: "Preflight failed, I'm not sending the actual request."

Result: CORS error, even though my API would have worked fine.

---

## The Error Messages (And What They Mean)

### Error 1: Missing CORS Header

\`\`\`
CORS header 'Access-Control-Allow-Origin' missing
Status code: 201
\`\`\`

Translation: "Your server responded successfully (201), but didn't include the required CORS header. I'm blocking this for security."

### Error 2: Failed Preflight

\`\`\`
CORS request did not succeed
Status code: (null)
\`\`\`

Translation: "Your preflight OPTIONS request failed. I won't even bother sending the actual request."

### Error 3: Multipart Form Data Specific

\`\`\`
Access to XMLHttpRequest at 'https://...' has been blocked by CORS policy
\`\`\`

Translation: "File uploads require special CORS handling for multipart/form-data. You didn't configure it."

---

## The Journey to the Fix

### Attempt 1: "Just Allow Everything"

\`\`\`python
allow_origins=["*"]
allow_methods=["*"]
allow_headers=["*"]
\`\`\`

**Result**: Still broken. The middleware works, but OPTIONS endpoints with dependencies still fail.

### Attempt 2: "Add an OPTIONS Handler"

\`\`\`python
@app.options("/{full_path:path}")
async def options_handler(full_path: str):
    return {"message": "OK"}
\`\`\`

**Result**: Better! But the FastAPI router doesn't match {full_path} to /api/v1/cv/upload correctly.

### Attempt 3: "Be More Explicit"

\`\`\`python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=[
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
    ],
    expose_headers=["*"],
    max_age=3600,
)
\`\`\`

**Result**: Still issues because the actual route handlers were rejecting OPTIONS requests.

### Attempt 4: "Fix the Routes" (The Real Solution)

The real issue was that my route handlers like:

\`\`\`python
@router.post("/upload")
async def upload_cv(file: UploadFile, db: Session = Depends(get_db)):
    ...
\`\`\`

Were trying to validate the file parameter for the OPTIONS request, causing a 400 error.

**The fix**: Let FastAPI's CORS middleware handle OPTIONS automatically without route conflicts.

\`\`\`python
# Remove: @app.options("/{full_path:path}") handler
# Keep: Just the explicit CORS middleware configuration

# Make sure middleware is added BEFORE routes
app.add_middleware(CORSMiddleware, ...)

# Then include routes
app.include_router(routes_cv.router, ...)
app.include_router(routes_jobs.router, ...)
app.include_router(routes_analysis.router, ...)
\`\`\`

**Result**: ✅ Works!

---

## What I Learned

### Lesson 1: Middleware Order Matters

Middleware is applied in reverse order of registration (the last registered is first executed).

\`\`\`python
# This order matters!
app.add_middleware(CORSMiddleware, ...)  # Must be before routes
app.include_router(routes, ...)
\`\`\`

### Lesson 2: Preflight Requests Are Critical

Any \`POST\`, \`PUT\`, \`DELETE\`, or requests with custom headers trigger preflight.

\`\`\`javascript
// This triggers preflight (multipart/form-data)
const formData = new FormData();
formData.append("file", file);
fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData
});
\`\`\`

### Lesson 3: Route Handlers and CORS

If a route handler tries to validate parameters for an OPTIONS request, it fails.

\`\`\`python
# This will reject OPTIONS requests if file param is required
@router.post("/upload")
async def upload(file: UploadFile):  # ❌ OPTIONS has no file
    ...

# Solution: Let middleware handle OPTIONS, don't define a handler
\`\`\`

### Lesson 4: \`allow_origins=["*"]\` Has Nuances

When you use \`allow_origins=["*"]\`, the response header becomes:

\`\`\`
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: false  // ← This is important!
\`\`\`

If you set \`allow_credentials=True\`, you can't use \`"*"\`. You must specify exact origins.

---

## The Final Solution

\`\`\`python
# Get origins from environment or allow all
cors_origins = os.getenv("CORS_ORIGINS", "").split(",") if os.getenv("CORS_ORIGINS") else ["*"]
cors_origins = [origin.strip() for origin in cors_origins if origin.strip()]

# Configure CORS explicitly
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=[
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
    ],
    expose_headers=["*"],
    max_age=3600,
)

# Make sure routes are included AFTER middleware
app.include_router(routes_cv.router, ...)
app.include_router(routes_jobs.router, ...)
app.include_router(routes_analysis.router, ...)
\`\`\`

**Key points:**
- ✅ Middleware added before routes
- ✅ Explicit methods list (includes OPTIONS)
- ✅ Explicit headers list
- ✅ \`max_age=3600\` to cache preflight for 1 hour
- ✅ No route handler for OPTIONS (let middleware handle it)

---

## Debugging CORS Issues

If you hit CORS problems, here's the checklist:

### Step 1: Identify the Type

**Check browser console:**
- "CORS header missing" → Backend not sending CORS headers
- "CORS request did not succeed" → Preflight OPTIONS failed
- "Access-Control-Allow-Origin missing" → Route handler executed but didn't send header

### Step 2: Test Preflight

\`\`\`bash
curl -i -X OPTIONS https://api.example.com/api/endpoint \\
  -H "Origin: https://frontend.com" \\
  -H "Access-Control-Request-Method: POST"
\`\`\`

**Good response:**
\`\`\`
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
\`\`\`

**Bad response:**
\`\`\`
HTTP/1.1 400 Bad Request  ❌
HTTP/1.1 500 Internal Server Error  ❌
\`\`\`

### Step 3: Test Actual Request

\`\`\`bash
curl -i -X POST https://api.example.com/api/endpoint \\
  -H "Origin: https://frontend.com" \\
  -H "Content-Type: application/json" \\
  -d '{"data": "test"}'
\`\`\`

### Step 4: Check Route Handler

Make sure route handlers don't validate parameters for OPTIONS requests:

\`\`\`python
# ❌ Bad - requires file for all methods
@router.post("/upload")
async def upload(file: UploadFile):
    ...

# ✅ Good - file only needed for POST
@router.post("/upload")
async def upload(file: UploadFile):
    ...
# CORS middleware automatically handles OPTIONS for this route
\`\`\`

---

## Impact on My Project

Once I fixed CORS:
- ✅ File uploads work from frontend
- ✅ Job submissions work
- ✅ Analysis runs without errors
- ✅ Full workflow functional

**Time spent debugging:** ~4 hours
**Lines of code changed:** ~15 lines
**Worth it?** Absolutely - I now understand CORS deeply!

---

## Key Takeaways

1. **CORS is a browser feature, not a backend issue** (usually)
2. **Preflight requests are automatic and mandatory** for certain request types
3. **Middleware order matters** in FastAPI
4. **Route handlers shouldn't validate OPTIONS requests**
5. **Explicit is better than implicit** when configuring CORS

---

## Conclusion

CORS isn't evil—it's security. The 4 hours I spent debugging taught me more about web standards than months of reading documentation.

If you're hitting CORS issues:
1. Don't panic—your backend is probably fine
2. Check the Network tab in DevTools
3. Look for the preflight OPTIONS request
4. Verify it returns 200 with proper headers
5. If it doesn't, fix the CORS configuration

And remember: **"Access-Control-Allow-Origin" isn't a bug, it's a feature!** 🔒

---

## Resources

- [MDN: CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [FastAPI CORS Middleware](https://fastapi.tiangolo.com/tutorial/cors/)
- [OWASP: Cross-Site Request Forgery](https://owasp.org/www-community/attacks/csrf)
- [Chrome DevTools: Network Tab](https://developer.chrome.com/docs/devtools/network/)`
  }
];
export const projects: any[] = [
  {
    id: 'p1',
    slug: 'ai-career-intelligence',
    title: 'AI-Powered Career & Job Intelligence Platform',
    category: 'AI & Backend',
    projectType: 'AI Systems Engineering',
    domains: ['AI', 'NLP', 'Backend', 'Career Tech'],
    desc: 'A web-based system that analyzes a user’s CV against a target job role and provides data-driven, actionable insights to improve employability.',
    tech: ['FastAPI', 'React', 'PostgreSQL', 'OpenAI', 'spaCy', 'TailwindCSS', 'Docker', 'Azure'],
    featured: true,
    type: 'free',
    architecture: 'The system uses a React frontend communicating with a FastAPI backend. The AI layer integrates OpenAI for semantic reasoning and spaCy for structured skill extraction. PostgreSQL is used for persistence and caching analysis results.',
    challenges: 'Implementing semantic CV-to-job matching that goes beyond simple keyword search, and building a step-by-step career roadmap generator based on identified skill gaps.',
    performance: 'Response times are kept under 3 seconds through an intelligent caching layer in PostgreSQL, which stores analysis results to avoid redundant AI computations.',
    content: `# 🚀 Job Intelligence Platform: Bridging the Gap Between Careers and Opportunities

## Introduction

Meet **Job Intelligence Platform** — an AI-powered application that helps professionals understand how well they fit specific job roles and what they need to learn to advance their careers.

In this post, I’ll walk you through the **vision, architecture, challenges, and lessons learned** while building a production-ready full-stack AI application.

---

## 🎯 Part 1: The Vision

### The Problem

Job searching is broken.

You find a job and immediately wonder:

* ❓ *Am I qualified?*
* ❓ *What skills am I missing?*
* ❓ *How long would it take me to get there?*
* ❓ *What should I learn first?*

Existing solutions fall short:

* ❌ Generic job boards → no personalization
* ❌ Resume checkers → shallow insights
* ❌ Career coaches → expensive
* ❌ Online courses → no direction

---

### 💡 The Solution

**Job Intelligence Platform combines:**

* 🤖 AI-powered job analysis
* 📊 Skill gap detection
* 🗺️ Personalized learning roadmaps
* 💡 Career recommendations

---

### 🎁 Value Proposition

**For Job Seekers**

* Upload CV once
* Get instant feedback on any job
* Know exactly what to learn next

**For Companies**

* Identify near-fit candidates
* Build future talent pipelines

**For the Platform**

* High engagement (repeat usage)
* AI-driven stickiness
* Compounding data advantage

---

## ⚙️ Part 2: How It Works

### 🔄 User Flow

\`\`\`mermaid
flowchart TD
    A[Upload CV] --> B[Extract Text & Structure]
    B --> C[Enter Job Description]
    C --> D[AI Analysis Engine]
    D --> E[Match Score]
    D --> F[Missing Skills]
    D --> G[Strengths]
    D --> H[Learning Roadmap]
    D --> I[Alternative Roles]
    E --> J[User Dashboard]
    F --> J
    G --> J
    H --> J
    I --> J
\`\`\`

---

### 🧠 What the System Produces

* 📊 Match Score (0–100%)
* 🧩 Missing Skills (with priority)
* 💪 Strengths
* 🗺️ Learning Roadmap (short → long term)
* 🔁 Alternative career paths

---

## 🏗️ Part 3: Technical Architecture

### 🌐 High-Level System Flow

\`\`\`mermaid
flowchart LR
    A[User Browser] --> B[React Frontend]
    B --> C[FastAPI Backend]

    C --> D[PostgreSQL Database]
    C --> E[AI Layer]

    E --> F[Azure OpenAI]
    E --> G[spaCy NLP]
\`\`\`

---

### 🔌 Request Lifecycle (End-to-End)

\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant AI as AI Engine
    participant DB as Database

    U->>F: Upload CV + Job Description
    F->>B: API Request
    B->>DB: Store CV + Job
    B->>AI: Send data for analysis
    AI->>B: Return insights
    B->>F: JSON response
    F->>U: Display results
\`\`\`

---

### 🧱 Tech Stack Breakdown

#### Frontend

* React + Vite
* TailwindCSS
* Framer Motion
* Hosted on Vercel

#### Backend

* FastAPI (async + high performance)
* SQLAlchemy ORM
* PDF parsing with \`pdfplumber\`

#### AI Layer

* Azure OpenAI (GPT-4o)
* spaCy (NLP extraction)

#### Database

* PostgreSQL (JSON support + reliability)

---

## 🧩 Part 4: Development Journey

### ⚠️ Challenge 1: PDF Parsing

**Problem:** Every CV format is different
**Solution:** \`pdfplumber\` for structured extraction

**Lesson:** Use proven libraries over reinventing the wheel

---

### 🤖 Challenge 2: AI Prompt Engineering

Generic prompts = generic results.

**Fix:** Structured prompts with strict JSON output

**Lesson:** Prompt design = system design

---

### 🌍 Challenge 3: CORS Issues

**Problem:** Requests worked… but browser blocked them

**Fix:** Proper middleware + preflight handling

**Lesson:**

> A 200 response means nothing if the browser rejects it

---

### 🧊 Challenge 4: Cold Starts

**Problem:** Backend sleeps → slow first request

**Solution:**

* Loading states
* Demo fallback mode
* Health checks

**Lesson:** Design UX for infrastructure limits

---

### 🗄️ Challenge 5: Database Timeouts

**Fix:**

* Connection pooling
* Timeouts
* Environment-specific configs

**Lesson:** Database behavior ≠ same across platforms

---

## 🧠 Part 5: Key Technical Decisions

### ⚖️ Platform Choice

| Option            | Decision       |
| ----------------- | -------------- |
| AWS EC2           | ❌ Too complex  |
| Azure App Service | ❌ Overkill     |
| Render            | ✅ Best balance |

---

### 🤖 AI Strategy

| Approach | Decision    |
| -------- | ----------- |
| Pure LLM | ❌ Expensive |
| Pure NLP | ❌ Limited   |
| Hybrid   | ✅ Best      |

---

### 🧑💻 Authentication

| Option          | Decision         |
| --------------- | ---------------- |
| Full Auth       | ❌ Too early      |
| No DB           | ❌ Poor UX        |
| DB without Auth | ✅ MVP sweet spot |

---

## 🚀 Part 6: Deployment Pipeline

\`\`\`mermaid
flowchart TD
    A[Push to GitHub] --> B[CI/CD Trigger]

    B --> C[Frontend Build]
    C --> D[Vercel Deploy]

    B --> E[Backend Docker Build]
    E --> F[Render Deploy]

    D --> G[Live App]
    F --> G
\`\`\`

---

### ⏱️ Deployment Speed

* Frontend: ~30s
* Backend: ~3 mins
* Total: ~3.5 mins

---

## 📊 Part 7: Metrics

**Performance**

* ⚡ Frontend: <2s
* 🚀 API: <500ms
* 🤖 AI: 3–5s

**Codebase**

* Frontend: ~2k LOC
* Backend: ~1.5k LOC
* Coverage: 70%

---

## 🧠 Part 8: Lessons Learned

### Technical

* CORS will break your app if ignored
* Cold starts affect UX
* Logging > guessing
* Be explicit with configs

---

### Product

* Demo mode is critical
* UX must explain delays
* Errors should be meaningful

---

### Business

* Free tiers have trade-offs
* Upgrade path matters
* Early user feedback is gold

---

## 🔮 Part 9: Future Roadmap

### Phase 2

* Authentication
* Saved analyses
* Skill tracking

### Phase 3

* Community + mentorship
* Peer learning

### Phase 4

* LinkedIn + GitHub integrations
* Course recommendations

### Phase 5

* Enterprise features
* Workforce analytics

---

## 🏁 Part 10: Conclusion

Building Job Intelligence Platform reinforced:

1. Solve real problems first
2. Choose tools intentionally
3. Design for failure scenarios
4. Prioritize clarity over cleverness
5. Iterate with real feedback

---

## 🧰 Tech Stack Summary

| Layer    | Tech                    |
| -------- | ----------------------- |
| Frontend | React + Vite            |
| Styling  | TailwindCSS             |
| Backend  | FastAPI                 |
| Database | PostgreSQL              |
| AI       | Azure OpenAI + spaCy    |
| Hosting  | Vercel + Render         |
| DevOps   | Docker + GitHub Actions |

---

## 🔗 Resources

* Live App: [https://job-intelligence-platform.vercel.app](https://job-intelligence-platform.vercel.app)
* GitHub: [https://github.com/yamkela-macwili/Job-Intelligence-Platform](https://github.com/yamkela-macwili/Job-Intelligence-Platform)
* API Docs: [https://job-intel-api.onrender.com/docs](https://job-intel-api.onrender.com/docs)

---

## 🙌 Final Note

This isn’t just a project — it’s a **career intelligence engine**.

The MVP is complete.
Now it’s time to **scale, refine, and learn from real users.**

---

*Last Updated: March 31, 2026*
*Project Status: MVP Complete, Production Ready*`
  }
];

export const defaultSkills: Skill[] = [
  // Languages
  { id: '1', name: 'Python', category: 'Languages', icon: 'python' },
  { id: '2', name: 'Java', category: 'Languages', icon: 'java' },
  { id: '3', name: 'TypeScript', category: 'Languages', icon: 'typescript' },
  { id: '4', name: 'R', category: 'Languages', icon: 'r' },
  { id: '5', name: 'SQL', category: 'Languages', icon: 'sql' },
  
  // Frameworks
  { id: '6', name: 'FastAPI', category: 'Frameworks', icon: 'fastapi' },
  { id: '7', name: 'Spring Boot', category: 'Frameworks', icon: 'springboot' },
  { id: '8', name: 'React', category: 'Frameworks', icon: 'react' },
  { id: '9', name: 'Node.js', category: 'Frameworks', icon: 'nodejs' },
  { id: '10', name: 'LangChain', category: 'Frameworks', icon: 'langchain' },
  
  // Databases
  { id: '11', name: 'PostgreSQL', category: 'Databases', icon: 'postgresql' },
  { id: '12', name: 'MongoDB', category: 'Databases', icon: 'mongodb' },
  { id: '13', name: 'Redis', category: 'Databases', icon: 'redis' },
  { id: '14', name: 'MySQL', category: 'Databases', icon: 'mysql' },
  { id: '15', name: 'pgvector', category: 'Databases', icon: 'vector' },
  
  // Tools & Infra
  { id: '16', name: 'Docker', category: 'Tools & Infra', icon: 'docker' },
  { id: '17', name: 'AWS', category: 'Tools & Infra', icon: 'aws' },
  { id: '18', name: 'Git', category: 'Tools & Infra', icon: 'git' },
  { id: '19', name: 'Linux', category: 'Tools & Infra', icon: 'linux' },
  { id: '20', name: 'GitHub Actions', category: 'Tools & Infra', icon: 'githubactions' },
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

export const defaultCertifications: any[] = [];
