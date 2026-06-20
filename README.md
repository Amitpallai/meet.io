# Meet.io

Meet.io is a professional video conferencing platform built with Next.js, TypeScript, and the 100ms SDK. It delivers a secure, responsive, and fully featured meeting experience for modern remote collaboration.

## Features

- High-quality video and audio conferencing
- Secure authentication and user sessions
- Meeting creation, joining, and participant management
- Responsive UI with dark/light theme support
- Meeting history and call tracking
- Invitation workflows and shareable meeting links
- Modern UI built with Tailwind CSS and Radix components

## Technology Stack

- Next.js 16
- React 19
- TypeScript
- Prisma + PostgreSQL
- 100ms React SDK
- NextAuth.js
- Tailwind CSS
- Radix UI
- React Hook Form
- React Query
- Zod

## Getting Started

### Prerequisites

- Node.js 18 or newer
- PostgreSQL database
- OAuth credentials for authentication providers (if used)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/meet.io.git
cd meet.io
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

- Copy `.env.example` to `.env.local`
- Add your database URL, authentication credentials, 100ms settings, and any required API keys

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to access the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Project Structure

- `src/app` - Next.js routes, pages, and layouts
- `src/components` - Reusable UI and feature components
- `src/lib` - Utility functions and helpers
- `src/schemas` - Validation and schema definitions
- `src/server` - Server-side helpers, authentication, and data access
- `prisma` - Prisma schema and database migrations

## Environment Configuration

The project validates environment variables in `src/env.mjs`. Make sure your `.env.local` includes all required values before starting the app.

## Deployment

Meet.io is ready to deploy on Vercel or any compatible Next.js hosting provider.

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start
```

For Vercel deployment, connect the repository and configure your environment variables in the Vercel dashboard.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a descriptive branch
3. Open a pull request with your changes

## License

No license is specified in this repository. Add one if you want to publish or open source this project.

## Contact

Amit Kumar Pallai

Portfolio: https://amitpallai.vercel.app
