'use client';

import { useEffect, useRef } from 'react';
import { Camera, Star } from 'lucide-react';
import styles from './About.module.css';

const stats = [
  { value: '50+', label: 'Brand Films Produced' },
  { value: '200+', label: 'Ads Delivered' },
  { value: '8+', label: 'Countries Served' },
  { value: '98%', label: 'Client Retention' },
];

export default function About() {
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
      { threshold: 0.15 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            <p className={`section-label reveal ${styles.label}`}>OUR STORY</p>

            <h2 className={`reveal ${styles.heading}`} style={{ transitionDelay: '0.1s' }}>
              WE ARE STORYTELLERS
              <br />
              BEHIND THE{' '}
              <span className="gradient-text">SCREEN.</span>
            </h2>

            <p className={`reveal ${styles.para}`} style={{ transitionDelay: '0.2s' }}>
              We are a creative video advertising studio passionate about transforming ideas,
              products, and brands into powerful visual experiences. We combine creativity,
              storytelling, and professional production to create advertisements that connect
              brands with people.
            </p>

            <p className={`reveal ${styles.para}`} style={{ transitionDelay: '0.3s' }}>
              Founded on the belief that every brand deserves extraordinary visual storytelling,
              MOTIONVERSE brings together creative directors, cinematographers, editors, and
              strategists to deliver advertising that moves.
            </p>

            {/* Stats Grid */}
            <div className={`reveal ${styles.statsGrid}`} style={{ transitionDelay: '0.4s' }}>
              {stats.map((stat) => (
                <div key={stat.value} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            <p className={`reveal ${styles.disclaimer}`} style={{ transitionDelay: '0.45s' }}>
              * Figures represent projected targets for MOTIONVERSE&apos;s first operational year.
            </p>

            <div className={`reveal ${styles.ctaWrap}`} style={{ transitionDelay: '0.5s' }}>
              <a href="#contact" className="btn-primary">
                Start Working With Us
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className={`reveal ${styles.rightCol}`} style={{ transitionDelay: '0.25s' }}>
            {/* Purple glow background */}
            <div className={styles.glow} />

            {/* Main Card */}
            <div className={styles.mainCard}>
              <div className={styles.cardGradientBorder} />
              <div className={styles.cardInner}>
                <Camera size={48} className={styles.cameraIcon} />
                <p className={styles.studioLabel}>CINEMATIC PRODUCTION STUDIO</p>

                <div className={styles.bars}>
                  <div className={styles.bar} style={{ width: '85%' }} />
                  <div className={styles.bar} style={{ width: '65%' }} />
                  <div className={styles.bar} style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            {/* Floating Award Card */}
            <div className={styles.awardCard}>
              <Star size={18} className={styles.starIcon} />
              <div>
                <p className={styles.awardTitle}>Creative Excellence</p>
                <p className={styles.awardYear}>Award 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
