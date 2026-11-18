'use client';

import { useEffect, useRef } from 'react';
import {
  Cpu,
  Shirt,
  Car,
  UtensilsCrossed,
  Heart,
  Home,
  GraduationCap,
  Tv2,
} from 'lucide-react';
import styles from './Industries.module.css';

const industries = [
  { icon: Cpu, name: 'Technology', category: 'Tech & Software' },
  { icon: Shirt, name: 'Fashion', category: 'Fashion & Lifestyle' },
  { icon: Car, name: 'Automotive', category: 'Automotive' },
  { icon: UtensilsCrossed, name: 'Food & Beverage', category: 'Food & Beverage' },
  { icon: Heart, name: 'Healthcare', category: 'Healthcare' },
  { icon: Home, name: 'Real Estate', category: 'Real Estate' },
  { icon: GraduationCap, name: 'Education', category: 'Education' },
  { icon: Tv2, name: 'Entertainment', category: 'Entertainment' },
];

export default function Industries() {
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
    <section id="industries" className={styles.industries} ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`reveal ${styles.header}`}>
          <p className="section-label">INDUSTRIES</p>
          <h2 className={styles.heading}>
            BRANDS WE <span className="gradient-text">ELEVATE</span>
          </h2>
          <p className={styles.subtitle}>
            From global enterprises to ambitious startups, we serve brands across every major
            industry.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className={`reveal glass ${styles.card}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={styles.iconWrap}>
                  <Icon size={48} className={styles.icon} />
                </div>
                <p className={styles.industryName}>{industry.name}</p>
                <p className={styles.categoryLabel}>{industry.category}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
