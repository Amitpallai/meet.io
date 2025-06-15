# Meet.io - Modern Video Conferencing Platform

Meet.io is a modern, feature-rich video conferencing platform built with Next.js, React, and 100ms SDK. It provides a seamless experience for virtual meetings with crystal clear audio and video quality.

## Features

- 🎥 High-quality video conferencing
- 🎤 Crystal clear audio
- 🔐 Secure authentication with Google and GitHub
- 🌙 Dark/Light mode support
- 📱 Responsive design
- 🔄 Real-time collaboration
- 📊 Meeting history tracking
- 👥 Multi-participant support
- 🔗 Shareable meeting links
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL with Prisma
- **Video SDK:** 100ms
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Form Handling:** React Hook Form
- **State Management:** React Query
- **Email:** React Email, Resend
- **Deployment:** Vercel

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials
- GitHub OAuth credentials

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/meet.io.git
   cd meet.io
   ```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment variables

- Copy `.env.example` to `.env.local` and fill in all required secrets and API keys.
- Update OAuth credentials for GitHub, Google, Discord, and 100ms in `.env.local`.

### 4. Set up the database

```sh
npm exec prisma migrate dev
```

### 5. Run the development server

```sh
npm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `npm dev` – Start the development server
- `npm build` – Build for production
- `npm start` – Start the production server
- `npm lint` – Lint the codebase

## Tech Stack

- [Next.js 13](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Zod](https://zod.dev/)

## Environment Variables

See [.env.example](.env.example) for all required variables.  
The schema is enforced in [`src/env.mjs`](src/env.mjs).

**Author:**  
Amit Kumar Pallai  
<<<<<<< HEAD
[Portfolio](https://amitpallai.vercel.app)
=======
