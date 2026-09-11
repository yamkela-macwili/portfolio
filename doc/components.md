# Component Documentation

This document provides an overview of the key components in the application.

## Core Components

### `Hero.tsx`

The landing section of the website.

-   **Features:**
    -   Interactive network background (`NetworkBackground.tsx`).
    -   Spotlight effect that follows the mouse cursor.
    -   Animated text and call-to-action buttons.
-   **Props:** None.

### `NetworkBackground.tsx`

A canvas-based component that renders an interactive network of nodes and connections.

-   **Features:**
    -   Nodes react to mouse movement.
    -   Connections are drawn dynamically based on proximity.
    -   "Data packets" travel along connections.
-   **Implementation:** Uses HTML5 Canvas API within a `useEffect` hook.

### `Navbar.tsx`

The main navigation bar.

-   **Features:**
    -   Sticky positioning with backdrop blur.
    -   Responsive design.
    -   Links to different sections/pages.
    -   Context-aware styling (e.g., active link highlighting).

### `Terminal.tsx`

An interactive terminal emulator.

-   **Features:**
    -   Simulates a command-line interface.
    -   Supports custom commands (e.g., `help`, `about`, `projects`).
    -   Draggable and resizable window.
-   **Props:**
    -   `isOpen`: Boolean to control visibility.
    -   `onClose`: Function to close the terminal.

### `Contact.tsx`

The contact form section.

-   **Features:**
    -   Form validation using `react-hook-form`.
    -   Loading and success states.
    -   Animated input fields.

## Page Components

### `Home.tsx`

The main landing page, composing `Hero`, `About`, `Projects`, `Blog`, and `Contact` sections.

### `ProjectDetail.tsx`

Displays detailed information about a specific project.

-   **Features:**
    -   Fetches project data based on the URL slug.
    -   Renders project description, tech stack, and images.

### `BlogDetail.tsx`

Displays a full blog post.

-   **Features:**
    -   Renders markdown content using `react-markdown`.
    -   Displays post metadata (date, author, tags).

## Utility Components

### `Layout.tsx` (Implicit in `App.tsx`)

Wraps the application content and handles global layout concerns like the navbar and footer.
