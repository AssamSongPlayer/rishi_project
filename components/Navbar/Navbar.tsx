'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home',      href: '#home' },
  { label: 'Services',  href: '#services' },
  { label: 'Our Work',  href: '#portfolio' },
  { label: 'About',     href: '#about' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);

  /* ── Scroll listener ──────────────────────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Lock body scroll when mobile menu is open ───────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={[
          styles.navbar,
          scrolled  ? styles.scrolled  : '',
          menuOpen  ? styles.menuOpen  : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          {/* ── Logo ──────────────────────────────────────────────────── */}
          <a href="#home" className={styles.logo} onClick={closeMenu} aria-label="MOTIONVERSE home">
            <span className={styles.logoAccent}>M</span>OTIONVERSE
          </a>

          {/* ── Desktop nav links ─────────────────────────────────────── */}
          <ul className={styles.desktopLinks} role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.navLink}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ───────────────────────────────────────────── */}
          <a href="#contact" className={styles.ctaBtn} aria-label="Contact us">
            Let&apos;s Talk
          </a>

          {/* ── Hamburger ─────────────────────────────────────────────── */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ──────────────────────────────────────────────── */}
      <div
        className={[styles.mobileOverlay, menuOpen ? styles.overlayOpen : ''].join(' ')}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileLinks} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={styles.mobileLinkItem} onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={styles.mobileCta}
          onClick={closeMenu}
          aria-label="Contact us"
        >
          Let&apos;s Talk
        </a>
      </div>
    </>
  );
}
