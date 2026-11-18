'use client'

import styles from './Marquee.module.css'

const marqueeItems = [
  'AWWWARDS SITE OF THE DAY',
  'CANNES LIONS BRONZE',
  'VIMEO STAFF PICK',
  'FWA OF THE DAY',
  'LONDON INTERNATIONAL AWARDS',
  'CLIO AWARDS SILVER',
  'BERLIN COMMERCIAL FESTIVAL',
  'AICP SHOW WINNER',
]

const brandNames = [
  'SONY ENTERTAINMENT',
  'PORSCHE DESIGN',
  'RED BULL MEDIA',
  'SPOTIFY STUDIOS',
  'HYUNDAI N-LINE',
  'NIKE INNOVATION',
  'BALENCIAGA DIGITAL',
  'APPLE MUSIC SESSIONS',
]

export default function Marquee() {
  return (
    <div className={styles.marqueeSection}>
      <div className={styles.badgeBar}>
        <div className={styles.track}>
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className={styles.item}>
              <span className={styles.star}>★</span>
              <span className={styles.text}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.brandsBar}>
        <div className="container">
          <p className={styles.trustedLabel}>TRUSTED BY GLOBAL TEAMS &amp; REVOLUTIONARY BRANDS</p>
        </div>
        <div className={styles.brandsTrack}>
          {[...brandNames, ...brandNames].map((brand, idx) => (
            <div key={idx} className={styles.brandPill}>
              <span className={styles.brandDot}></span>
              <span className={styles.brandText}>{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
