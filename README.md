# Meet.io

Meet.io is a modern video call platform built with Next.js 13, TypeScript, Prisma, and 100ms. It demonstrates authentication, real-time group video calls, and a modular, scalable architecture.

## Features

- **Authentication**: Sign in with GitHub, Google, or Discord using NextAuth.js.
- **Group Video Calls**: Powered by [100ms](https://www.100ms.live/) for real-time video/audio.
- **Database**: Prisma ORM with PostgreSQL (or your preferred DB).
- **Modern UI**: Built with Tailwind CSS and Radix UI components.
- **Environment Validation**: Uses Zod and @t3-oss/env-nextjs for type-safe environment variables.

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/Amitpallai/meet.io.git
cd meet.io
```

### 2. Install dependencies

```sh
pnpm install
```

### 3. Configure environment variables

- Copy `.env.example` to `.env.local` and fill in all required secrets and API keys.
- Update OAuth credentials for GitHub, Google, Discord, and 100ms in `.env.local`.

### 4. Set up the database

```sh
pnpm exec prisma migrate dev
```

### 5. Run the development server

```sh
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `pnpm dev` – Start the development server
- `pnpm build` – Build for production
- `pnpm start` – Start the production server
- `pnpm lint` – Lint the codebase

## Tech Stack

- [Next.js 13](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [100ms](https://www.100ms.live/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Zod](https://zod.dev/)

## Environment Variables

See [.env.example](.env.example) for all required variables.  
The schema is enforced in [`src/env.mjs`](src/env.mjs).

**Author:**  
Amit Kumar Pallai  
[Portfolio](https://amitpallai.vercel.app)