# AI Workplace Companion

A modern, responsive web application that helps professionals automate everyday workplace tasks with AI. Built as a clean, professional SaaS dashboard with sidebar navigation, the app provides three core productivity tools powered by simulated AI responses.

![Built with TanStack Start](https://img.shields.io/badge/Built%20with-TanStack%20Start-blue?style=flat-square)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)

## Overview

The **AI Workplace Companion** is designed to streamline common knowledge-work tasks through an intuitive, AI-assisted interface. It combines a professional SaaS aesthetic with a responsive layout, making it easy to draft communications, distill meeting notes, and plan work across a week or day.

This project uses a simulated AI engine for all responses, so every feature works instantly without needing external API keys.

## Main Features

### 1. Smart Email Generator
- Enter the context or key points you want to communicate.
- Choose a tone: **Formal**, **Friendly**, or **Persuasive**.
- Instantly generate a complete subject line and body.
- One-click copy to clipboard.

### 2. Meeting Notes Summarizer
- Paste raw meeting notes into a text area.
- Receive a structured output with:
  - A concise summary
  - Action items with checkboxes
  - Key decisions
  - Upcoming deadlines
- Mark action items as completed as you work through them.

### 3. AI Task Planner & Scheduler
- Add tasks with priorities (**High**, **Medium**, **Low**) and estimated durations.
- Toggle between **Daily** and **Weekly** schedule views.
- Get a visually organized time-blocked schedule based on priority and task length.

### Dashboard
- Central overview with usage statistics and quick links to each tool.
- "How it works" guide for first-time users.

### Responsible AI
- A visible responsible AI disclaimer is shown in the header and footer of every page, reminding users to review and verify AI-generated content before using it in professional contexts.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start/) — full-stack React framework with file-based routing
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4 with OKLCH color tokens and a custom design system
- **Components:** shadcn/ui primitives (Radix UI based)
- **Language:** TypeScript 5.8
- **Build Tool:** Vite 8
- **State & Data:** TanStack Query, React Hook Form, Zod
- **Icons:** Lucide React

## Project Structure

```
├── src/
│   ├── components/         # Reusable UI components (Sidebar, PageHeader, etc.)
│   ├── lib/                # Utility logic and simulated AI engine
│   │   └── mock-ai.ts      # AI simulation for email, notes, and scheduling
│   ├── routes/             # TanStack Start file-based routes
│   │   ├── __root.tsx      # Root layout with sidebar and disclaimers
│   │   ├── index.tsx       # Dashboard overview
│   │   ├── email-generator.tsx
│   │   ├── notes-summarizer.tsx
│   │   └── task-planner.tsx
│   ├── styles.css          # Global design tokens and Tailwind theme
│   └── router.tsx          # Router configuration
├── public/                 # Static assets
├── package.json
├── README.md
└── vite.config.ts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- A package manager such as `npm`, `yarn`, `pnpm`, or `bun`

### Installation

1. Clone the repository:

   ```sh
   git clone <this-repository-url>
   cd <repository-name>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

   Or with `bun`:

   ```sh
   bun install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:8080` by default.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the production bundle |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run format` | Format code with Prettier |

## Usage

1. Open the app in your browser.
2. Use the left sidebar to navigate between **Email Generator**, **Notes Summarizer**, and **Task Planner**.
3. Fill in the inputs and click the generate button to see simulated AI output.
4. Copy, check off, or adjust results as needed.

## Notes

- All AI responses in this project are simulated by `src/lib/mock-ai.ts` for demonstration purposes.
- No external AI API keys are required to run the app.
- Before using generated content in real communications, documents, or schedules, always review and edit it for accuracy and tone.

## License

This project was generated with [Lovable](https://lovable.dev) and is provided as a starting point for your own application. Modify, extend, and deploy it as you see fit.
