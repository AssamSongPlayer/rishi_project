'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react'
import styles from './Testimonials.module.css'

interface Testimonial {
  id: number
  quote: string
  clientName: string
  role: string
  company: string
  industry: string
  metric: string
  metricLabel: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "MOTIONVERSE transformed our brand perception overnight. The cinematic launch film they produced didn't just look like Hollywood—it drove a 340% increase in qualified enterprise leads during our first quarter.",
    clientName: "Marcus Sterling",
    role: "Chief Marketing Officer",
    company: "Aether Dynamics (US)",
    industry: "Deep Tech & Aerospace",
    metric: "+340%",
    metricLabel: "Qualified Pipeline Growth"
  },
  {
    id: 2,
    quote: "Their mastery of lighting, pacing, and color grading is unmatched in the agency world. The product ad they created for our luxury collection felt like pure art, yet performed better than any digital campaign we've ever run.",
    clientName: "Elena Rostova",
    role: "Head of Global Brand",
    company: "Velvet Heritage",
    industry: "Luxury Fashion & Lifestyle",
    metric: "14.2M",
    metricLabel: "Organic Social Impressions"
  },
  {
    id: 3,
    quote: "Working with the MOTIONVERSE team was seamless from creative scriptwriting through to final delivery. They respected our aggressive deadlines while delivering an advertisement that won two design festival awards.",
    clientName: "Kenji Takahashi",
    role: "VP of Product Strategy",
    company: "DriveX Global Motors",
    industry: "Automotive Innovation",
    metric: "4.8x",
    metricLabel: "Conversion Rate Surge"
  }
]

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0)

  // Auto rotate testimonials every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[activeIdx]

  return (
    <section className={`section-padding ${styles.testimonialsSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
            EXECUTIVE ENDORSEMENTS
          </span>
          <h2 className={styles.heading}>
            WORDS FROM <span className="gradient-text">VISIONARY BRANDS.</span>
          </h2>
          <p className={styles.subtext}>
            What happens when world-class creative storytelling aligns with high-converting marketing strategy.
          </p>
        </div>

        <div className={styles.testimonialCardWrapper}>
          <div className={`${styles.testimonialCard} glass`}>
            {/* Top quote header */}
            <div className={styles.cardTop}>
              <div className={styles.quoteIcon}>
                <Quote size={32} />
              </div>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
            </div>

            {/* Quote body */}
            <p className={styles.quoteText}>&ldquo;{current.quote}&rdquo;</p>

            {/* Bottom info row */}
            <div className={styles.cardBottom}>
              <div className={styles.authorInfo}>
                <div className={styles.authorAvatar}>
                  {current.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className={styles.authorName}>{current.clientName}</h4>
                  <p className={styles.authorRole}>{current.role} &bull; <span className={styles.companyName}>{current.company}</span></p>
                  <span className={styles.industryTag}>{current.industry}</span>
                </div>
              </div>

              <div className={styles.metricBlock}>
                <span className={styles.metricValue}>{current.metric}</span>
                <span className={styles.metricLabel}>{current.metricLabel}</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className={styles.controlsRow}>
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className={styles.navBtns}>
              <button
                className={styles.navBtn}
                onClick={() => setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={styles.navBtn}
                onClick={() => setActiveIdx((prev) => (prev + 1) % testimonials.length)}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
