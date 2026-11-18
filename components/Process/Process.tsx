'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, Lightbulb, Camera, Rocket } from 'lucide-react';
import styles from './Process.module.css';

const steps = [
  {
    number: '01',
    title: 'DISCOVER',
    icon: Search,
    description:
      'We immerse ourselves in your brand, understand your audience, and define the advertising goals that will drive real results.',
  },
  {
    number: '02',
    title: 'CREATE',
    icon: Lightbulb,
    description:
      'Our creative team develops compelling concepts, scripts, storyboards, and visual direction that capture your brand essence.',
  },
  {
    number: '03',
    title: 'PRODUCE',
    icon: Camera,
    description:
      'Professional shooting, masterful editing, cinematic color grading, and polished motion graphics bring your vision to life.',
  },
  {
    number: '04',
    title: 'DELIVER',
    icon: Rocket,
    description:
      'We deliver your final advertisement in all required formats and resolutions, optimized for every platform and screen.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSteps((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 150);
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="process" className={styles.process} ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={`section-label ${styles.label}`}>HOW WE WORK</span>
          <h2 className={styles.heading}>
            FROM CONCEPT
            <br />
            TO <span className="gradient-text">SCREEN.</span>
          </h2>
          <p className={styles.subtitle}>
            A refined creative process engineered for exceptional results.
          </p>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[i] = el; }}
                className={`${styles.step} ${visibleSteps[i] ? styles.stepVisible : ''}`}
              >
                {/* Connector line (not on last item) */}
                {i < steps.length - 1 && (
                  <div className={styles.connector} />
                )}

                {/* Background number */}
                <span className={styles.bgNumber}>{step.number}</span>

                {/* Icon circle */}
                <div className={styles.iconWrap}>
                  <Icon size={28} strokeWidth={1.8} color="#fff" />
                </div>

                {/* Step number badge */}
                <div className={styles.stepNum}>{step.number}</div>

                {/* Content */}
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
