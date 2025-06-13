export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
      twitter: string
      github: string
    }
}

export const siteConfig: SiteConfig = {
  name: "Meet.io",
  description:
    "Connect with anyone, anywhere with crystal clear audio and video. Experience enterprise-grade features designed for teams of all sizes.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/web-shot.png`,
  links: {
    twitter: "https://x.com/amit_pallai",
    github: "https://github.com/Amit6841",
  },
}