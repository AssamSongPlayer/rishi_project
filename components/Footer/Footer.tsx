'use client'

import { ArrowUpRight, Sparkles, Mail, Phone, MapPin } from 'lucide-react'
import { InstagramIcon, YoutubeIcon, LinkedinIcon, TwitterIcon } from '@/components/Icons/SocialIcons'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = 2025

  return (
    <footer className={styles.footer}>
      {/* Pre-footer Call to Action Banner */}
      <div className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaBannerInner}>
            <div className={styles.ctaText}>
              <span className="section-label">
                <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
                READY FOR CINEMATIC IMPACT?
              </span>
              <h3 className={styles.ctaHeadline}>
                Let’s create something <span className="gradient-text">extraordinary</span> together.
              </h3>
            </div>
            <a href="#contact" className="btn-primary">
              Start Your Project <ArrowUpRight size={18} style={{ marginLeft: '6px', verticalAlign: '-3px' }} />
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.mainFooter}>
          {/* Column 1: Brand Info */}
          <div className={styles.brandCol}>
            <a href="#home" className={styles.logo}>
              <span className={styles.logoAccent}>M</span>OTIONVERSE
            </a>
            <p className={styles.tagline}>&ldquo;We Make Brands Move.&rdquo;</p>
            <p className={styles.brandBio}>
              A world-class creative video advertising studio partnering with forward-thinking brands, startups, and global enterprises to produce cinematic, high-conversion commercial films.
            </p>
            <div className={styles.socialRow}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
                <YoutubeIcon size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">What We Create</a></li>
              <li><a href="#portfolio">Selected Work</a></li>
              <li><a href="#process">Creative Process</a></li>
              <li><a href="#why-us">Why Choose Us</a></li>
              <li><a href="#industries">Industries</a></li>
              <li><a href="#about">About Our Studio</a></li>
              <li><a href="#contact">Project Inquiry</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.linkList}>
              <li><a href="#services">Brand Commercials</a></li>
              <li><a href="#services">Product Advertisement</a></li>
              <li><a href="#services">Social Media Ads & Reels</a></li>
              <li><a href="#services">Corporate & B2B Videos</a></li>
              <li><a href="#services">Creative Video Production</a></li>
              <li><a href="#services">Motion Graphics & VFX</a></li>
              <li><a href="#services">Color Grading & Finishing</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Studio Info */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Studio & Inquiries</h4>
            <ul className={styles.contactList}>
              <li>
                <Mail size={16} className={styles.infoIcon} />
                <span>hello@motionverse.agency</span>
              </li>
              <li>
                <Phone size={16} className={styles.infoIcon} />
                <span>+1 (800) 555-MVRSE</span>
              </li>
              <li>
                <MapPin size={16} className={styles.infoIcon} />
                <span>Los Angeles &bull; London &bull; Remote</span>
              </li>
            </ul>
            <div className={styles.availabilityBadge}>
              <span className={styles.pulseDot}></span>
              <span>Accepting New Brand Projects for Q1/Q2</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} MOTIONVERSE Creative Agency Ltd. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#home">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#home">Terms of Production</a>
            <span>&bull;</span>
            <span className={styles.madeWith}>Crafted with cinematic precision.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
