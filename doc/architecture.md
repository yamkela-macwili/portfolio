# Architecture Overview

This project is a modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS for a Backend Engineer. It emphasizes a clean, minimalist aesthetic with interactive elements and smooth animations.

## Tech Stack

-   **Frontend Framework:** React 19
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS v4
-   **Animation:** Motion (formerly Framer Motion)
-   **Routing:** React Router v7
-   **Icons:** Lucide React
-   **Build Tool:** Vite

## Project Structure

```
/src
├── components/       # Reusable UI components
│   ├── Hero.tsx      # Landing section with interactive background
│   ├── Navbar.tsx    # Navigation bar
│   ├── Terminal.tsx  # Interactive terminal component
│   └── ...
├── context/          # React Context providers (Auth, Theme, etc.)
├── hooks/            # Custom React hooks
├── pages/            # Page components (Home, Projects, Blog, etc.)
├── lib/              # Utility functions and helpers
├── types.ts          # Global TypeScript type definitions
├── data.ts           # Static data for projects and blog posts
├── App.tsx           # Main application component with routing
└── main.tsx          # Application entry point
```

## Key Architectural Decisions

1.  **Component-Based Design:** The UI is broken down into small, reusable components.
2.  **Tailwind CSS for Styling:** Utility-first CSS for rapid development and consistent design.
3.  **Motion for Animations:** Declarative animations for smooth transitions and interactions.
4.  **Context API for State Management:** Used for global state like authentication and theme.
5.  **Static Data:** Project and blog data is currently stored in `data.ts` for simplicity, but the architecture allows for easy migration to a CMS or backend API.

## Data Flow

Data flows primarily from `data.ts` or context providers down to components via props. The `useContent` hook provides a centralized way to access project and blog data.

## Future Considerations

-   **CMS Integration:** Moving content to a headless CMS (e.g., Sanity, Contentful).
-   **Backend Integration:** Connecting to a real backend for contact form submissions and dynamic content.
-   **SEO Optimization:** Implementing meta tags and structured data.
