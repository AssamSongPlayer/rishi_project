'use client';

import { useEffect, useRef } from 'react';
import { Film, Star, Zap, Building2, Clapperboard, Layers, ArrowUpRight } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  {
    icon: Film,
    title: 'Brand Commercials',
    description:
      'High-quality brand advertisements, compelling storytelling, and corporate promotional films that define your identity.',
    tags: ['Brand Story', 'TV Commercial', 'Corporate Film'],
  },
  {
    icon: Star,
    title: 'Product Advertisement',
    description:
      "Cinematic product showcases and promotional campaigns that highlight your product's unique value and drive conversions.",
    tags: ['Product Launch', 'Campaign Ad', 'Showcase'],
  },
  {
    icon: Zap,
    title: 'Social Media Ads',
    description:
      'Instagram Reels, YouTube ads, and short-form promotional videos optimized for maximum engagement and reach.',
    tags: ['Instagram', 'YouTube', 'Short-Form'],
  },
  {
    icon: Building2,
    title: 'Corporate Videos',
    description:
      'Company introductions, corporate presentations, and business promotional films that build authority and trust.',
    tags: ['Company Intro', 'Corporate', 'B2B'],
  },
  {
    icon: Clapperboard,
    title: 'Creative Production',
    description:
      'Full-cycle concept development, professional editing, color grading, and motion graphics for stunning results.',
    tags: ['Concept Dev', 'Color Grade', 'Editing'],
  },
  {
    icon: Layers,
    title: 'Motion Graphics',
    description:
      'Animated advertisements, logo animations, and visual effects that add premium production value to your brand.',
    tags: ['Animation', 'Logo Motion', 'VFX'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={`section-padding ${styles.services}`} ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <span className="section-label">OUR EXPERTISE</span>
          <h2 className={styles.heading}>
            WHAT WE{' '}
            <span className="gradient-text">CREATE</span>
          </h2>
          <p className={styles.subtitle}>
            Every brand has a story worth telling. We craft the visuals that bring it to life.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {services.map((service, index) => {
            const Icon = service.icon;
            const cardNumber = String(index + 1).padStart(2, '0');
            return (
              <div
                key={service.title}
                className={`glass ${styles.card} reveal`}
                style={{ transitionDelay: `${0.1 * index}s` }}
              >
                {/* Faded card number */}
                <span className={styles.cardNumber}>{cardNumber}</span>

                {/* Icon */}
                <div className={styles.iconWrap}>
                  <Icon size={24} color="#fff" strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>

                {/* Tags */}
                <div className={styles.tags}>
                  {service.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover arrow */}
                <div className={styles.arrow}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
