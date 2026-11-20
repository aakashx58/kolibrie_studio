# Kolibrie Studio — AI Studio Applet

Kolibrie Studio is an AI-powered studio applet built with [Next.js](https://nextjs.org), [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com), and the [Google Gen AI SDK](https://www.npmjs.com/package/@google/genai). It runs inside Google AI Studio as an applet.

## Tech stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Styling:** Tailwind CSS 4, `lucide-react`, `motion`, `clsx` + `tailwind-merge` + `class-variance-authority`
- **AI:** `@google/genai` (Gemini)
- **Language:** TypeScript
- **Deploy target:** Standalone output (Cloud Run / Firebase App Hosting)

## Getting started

### Prerequisites

- Node.js 20+
- A Gemini API key (from [Google AI Studio](https://aistudio.google.com/))

### Installation

```bash
# Install dependencies
npm install

# Copy the example environment file
cp .env.example .env.local

# Fill in your values in .env.local (see "Environment variables" below)
```

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Gemini API key. AI Studio injects this at runtime from user secrets. |
| `APP_URL` | Yes | URL where the applet is hosted. AI Studio injects this at runtime with the Cloud Run service URL. |

### Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Next.js development server with Turbopack |
| `npm run build` | Build the app for production (standalone output) |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run clean` | Clean the Next.js cache |

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Building for production

```bash
npm run build
npm run start
```

The build produces a standalone output in `.next/standalone`, suitable for deployment to Cloud Run or Firebase App Hosting.

## Project structure

```
app/               # Next.js App Router (pages, layout, globals)
components/        # React components (e.g. KolibrieStudio)
hooks/             # Custom React hooks
lib/               # Utility libraries
public/            # Static assets
.env.example       # Example environment variables
.next/             # Build output (gitignored)
```

## Deployment

This applet is designed to be deployed through Google AI Studio / Firebase App Hosting. The `APP_URL` and `GEMINI_API_KEY` secrets are injected automatically at runtime via the AI Studio UI Secrets panel; do not commit real secret values to version control.

## License

Private — internal use.