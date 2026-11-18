'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Target,
  Award,
  Clock,
  TrendingUp,
  Clapperboard,
} from 'lucide-react';
import styles from './WhyUs.module.css';

const advantages = [
  {
    icon: CheckCircle2,
    title: 'Creative Storytelling',
    description: 'Narratives that emotionally connect your brand to your audience.',
  },
  {
    icon: Sparkles,
    title: 'Cinematic Production',
    description: 'Hollywood-grade equipment and techniques for premium visual quality.',
  },
  {
    icon: Target,
    title: 'Brand-Focused Strategy',
    description: 'Every creative decision is aligned with your business and advertising goals.',
  },
  {
    icon: Award,
    title: 'Exceptional Quality',
    description: 'We obsess over every frame, ensuring flawless production in every project.',
  },
  {
    icon: Clock,
    title: 'Reliable Delivery',
    description: 'Structured timelines and professional project management you can depend on.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Impact',
    description: 'Advertisements designed not just to look great, but to generate real results.',
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  useEffect(() => {
    const makeObs = (el: HTMLElement | null, setter: (v: boolean) => void) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    };

    const o1 = makeObs(leftRef.current, setLeftVisible);
    const o2 = makeObs(rightRef.current, setRightVisible);
    return () => { o1?.disconnect(); o2?.disconnect(); };
  }, []);

  return (
    <section id="why-us" className={styles.whyUs} ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={`section-label ${styles.label}`}>WHY MOTIONVERSE</span>
          <h2 className={styles.heading}>
            CREATIVITY MEETS
            <br />
            <span className="gradient-text">STRATEGY.</span>
          </h2>
        </div>

        {/* Two-column body */}
        <div className={styles.body}>
          {/* ── Left column ── */}
          <div
            ref={leftRef}
            className={`${styles.left} ${leftVisible ? styles.slideInLeft : ''}`}
          >
            <p className={styles.statement}>
              We don&apos;t just make videos. We engineer advertising that converts.
            </p>
            <p className={styles.brandCopy}>
              At Motionverse, every project is a collaboration between creative vision and
              performance strategy. From pre-production planning to final delivery, we build
              advertisements that don&apos;t just look exceptional — they move audiences, strengthen
              brands, and generate measurable results for the businesses that trust us.
            </p>

            {/* Studio image placeholder */}
            <div className={styles.imagePlaceholder}>
              <div className={styles.imagePlaceholderInner}>
                <div className={styles.cameraIcon}>
                  <Clapperboard size={48} strokeWidth={1.4} color="#8B5CF6" />
                </div>
                <span className={styles.imagePlaceholderLabel}>Professional Studio Setup</span>
                <span className={styles.imagePlaceholderSub}>State-of-the-art equipment &amp; crew</span>
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div
            ref={rightRef}
            className={`${styles.right} ${rightVisible ? styles.slideInRight : ''}`}
          >
            <ul className={styles.advantageList}>
              {advantages.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className={styles.advantageItem}
                    style={{ transitionDelay: rightVisible ? `${i * 80}ms` : '0ms' }}
                  >
                    <div className={styles.advantageIcon}>
                      <Icon size={18} strokeWidth={2} color="#8B5CF6" />
                    </div>
                    <div className={styles.advantageText}>
                      <strong className={styles.advantageTitle}>{item.title}</strong>
                      <span className={styles.advantageDesc}>{item.description}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
