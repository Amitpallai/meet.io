import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { PulseLogo } from '../pulselogo';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Security', href: '#security' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help center', href: '/help' },
      { label: 'Status', href: '/status' },
      { label: 'API docs', href: '/docs' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto max-w-[1200px] px-4 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <PulseLogo size={24} />
              <span className="font-display text-lg font-semibold tracking-tight">
                Meet.io
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Video calls that get out of the way.
            </p>
            <div className="mt-6 flex items-center gap-3 text-muted-foreground">
              <a href="#" aria-label="GitHub" className="transition-colors hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="transition-colors hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 Meet.io. All rights reserved.</span>
          <span className="flex items-center gap-2 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EEAD4] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5EEAD4]" />
            </span>
            all systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}