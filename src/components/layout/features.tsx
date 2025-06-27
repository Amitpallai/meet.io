'use client';

import { useState, useEffect, useRef } from 'react';
import { Video, Users, Share2, Shield, MessageSquare, SwordIcon as  Globe } from 'lucide-react';

export function FeaturesSection() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Video,
      title: 'HD Video & Audio',
      description: 'Crystal-clear 1080p video and studio-quality audio for professional meetings.',
    },
    {
      icon: Users,
      title: 'Up to 1000 Participants',
      description: 'Host large-scale meetings, webinars, and virtual events with ease.',
    },
    {
      icon: Share2,
      title: 'Screen Sharing',
      description: 'Share your entire screen, specific applications, or browser tabs seamlessly.',
    },
    {
      icon: Shield,
      title: 'End-to-End Encryption',
      description: 'Bank-level security with AES 256-bit encryption for all your conversations.',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat & Reactions',
      description: 'Interactive chat, polls, and emoji reactions to keep everyone engaged.',
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Lightning-fast connections with our worldwide network of servers.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleFeatures((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureElements = sectionRef.current?.querySelectorAll('[data-index]');
    featureElements?.forEach((el) => observer.observe(el));

    return () => {
      featureElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="features" className="py-24 bg-muted/20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need for perfect meetings
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make your video conferences more productive,
            secure, and engaging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`group p-8 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-500 ${
                visibleFeatures.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: visibleFeatures.includes(index) ? `${index * 100}ms` : '0ms',
              }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}