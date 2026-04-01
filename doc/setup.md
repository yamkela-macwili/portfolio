# Setup and Installation

Follow these instructions to set up and run the project locally.

## Prerequisites

-   **Node.js:** Version 18 or higher.
-   **npm:** Version 9 or higher.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Running the Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

Build the application for production deployment:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Linting

Run the linter to check for code quality issues:

```bash
npm run lint
```

## Environment Variables

Create a `.env` file in the root directory if you need to configure environment variables. See `.env.example` for reference.

Currently used variables:
-   `VITE_API_URL`: (Optional) URL for the backend API.
