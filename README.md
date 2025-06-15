# Meet.io - Modern Video Conferencing Platform

Meet.io is a modern, feature-rich video conferencing platform built with Next.js, React, and 100ms SDK. It provides a seamless experience for virtual meetings with crystal clear audio and video quality.

![Meet.io Screenshot](public/web-shot.png)

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

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Base URL
   NEXTAUTH_URL=http://localhost:3000
   
   # Authentication
   NEXTAUTH_SECRET=your_32_character_long_random_string_here
   
   # OAuth Credentials
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/meetio"
   
   # Email (Optional)
   RESEND_API_KEY=your_resend_api_key
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXTAUTH_URL` | Base URL of your application |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret |
| `DATABASE_URL` | PostgreSQL database URL |
| `RESEND_API_KEY` | Resend API key for email functionality |

## Project Structure

```
meet.io/
├── prisma/           # Database schema and migrations
├── public/           # Static assets
├── src/
│   ├── app/         # Next.js app directory
│   ├── components/  # React components
│   ├── config/      # Configuration files
│   ├── context/     # React context providers
│   ├── lib/         # Utility functions
│   ├── server/      # Server-side code
│   └── styles/      # Global styles
├── .env.local       # Environment variables
└── package.json     # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postinstall` - Generate Prisma client

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [100ms](https://www.100ms.live/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

## Support

For support, email support@meet.io or open an issue in the GitHub repository.
