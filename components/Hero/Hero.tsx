'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Sparkles, X, Pause, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

// Deterministic coordinates for particles to prevent SSR/hydration mismatch
const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: `${((i * 17 + 7) % 95) + 2}%`,
  left: `${((i * 31 + 13) % 96) + 2}%`,
  width: `${(i % 3) + 2}px`,
  height: `${(i % 3) + 2}px`,
  animationDelay: `${(i * 0.4) % 5}s`,
  animationDuration: `${((i * 0.7) % 4) + 4}s`,
  opacity: 0.15 + ((i % 5) * 0.1),
}));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showReelModal, setShowReelModal] = useState(false);
  const [isPlayingReel, setIsPlayingReel] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [timecode, setTimecode] = useState('00:02:14:18');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    if (reveals) {
      const timer = setTimeout(() => {
        reveals.forEach((el) => el.classList.add('visible'));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  // Timecode animation ticker for cinematic camera simulation
  useEffect(() => {
    let frame = 18;
    let sec = 14;
    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec = (sec + 1) % 60;
      }
      setTimecode(`00:02:${sec.toString().padStart(2, '0')}:${frame.toString().padStart(2, '0')}`);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Track mouse for ambient spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      className={styles.hero}
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className={styles.cursorSpotlight}
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.15), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Particles */}
      <div className={styles.particlesContainer} aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className={styles.particle}
            style={{
              top: p.top,
              left: p.left,
              width: p.width,
              height: p.height,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Cinematic glow overlays */}
      <div className={styles.glowLeft} aria-hidden="true" />
      <div className={styles.glowRight} aria-hidden="true" />

      {/* Film grain overlay */}
      <div className={styles.filmGrain} aria-hidden="true" />

      <div className={`container ${styles.heroInner}`}>
        {/* Left content */}
        <div className={styles.leftContent}>
          {/* REEL badge */}
          <div
            className={`reveal ${styles.reelBadge}`}
            onClick={() => setShowReelModal(true)}
            role="button"
            tabIndex={0}
            aria-label="Watch Showreel 2025"
          >
            <span className={styles.playIcon}><Play size={12} fill="currentColor" /></span>
            <span className={styles.reelText}>WATCH SHOWREEL 2025</span>
            <span className={styles.reelIndicator} />
          </div>

          {/* Headline */}
          <h1 className={`reveal ${styles.headline}`} style={{ transitionDelay: '0.3s' }}>
            WE TURN IDEAS INTO
            <br />
            <span className="gradient-text">UNFORGETTABLE</span> VISUALS.
          </h1>

          {/* Subtext */}
          <p className={`reveal ${styles.subtext}`} style={{ transitionDelay: '0.6s' }}>
            From powerful brand stories to cinematic product commercials, we create video
            advertisements that capture attention and move businesses forward.
          </p>

          {/* CTA Buttons */}
          <div className={`reveal ${styles.ctaGroup}`} style={{ transitionDelay: '0.9s' }}>
            <a href="#contact" className="btn-primary">
              Start a Project
            </a>
            <a href="#portfolio" className="btn-secondary">
              Explore Our Work
            </a>
          </div>

          {/* Stats Row */}
          <div className={`reveal ${styles.statsRow}`} style={{ transitionDelay: '1.1s' }}>
            {[
              { number: '50+', label: 'Brand Films' },
              { number: '200+', label: 'Ads Delivered' },
              { number: '8+', label: 'Countries' },
              { number: '98%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual — film reel mockup */}
        <div
          className={`reveal ${styles.filmReel}`}
          style={{ transitionDelay: '0.5s' }}
          onClick={() => setShowReelModal(true)}
        >
          <div className={styles.filmCard}>
            {/* Film strip perforations */}
            <div className={styles.filmStrip}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.perforation} />
              ))}
            </div>

            {/* Live Camera OSD Header */}
            <div className={styles.cameraOSD}>
              <div className={styles.recDotRow}>
                <span className={styles.liveRecDot} />
                <span>REC [RAW]</span>
              </div>
              <div className={styles.tcCounter}>{timecode}</div>
              <div className={styles.fpsBadge}>4K 60FPS</div>
            </div>

            {/* Stacked screen previews */}
            <div className={styles.screenStack}>
              <div className={`${styles.screen} ${styles.screenBack}`}>
                <div className={styles.screenGradient} style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #0d1b4a 100%)' }} />
                <span className={styles.screenLabel}>BRAND STORY</span>
              </div>
              <div className={`${styles.screen} ${styles.screenMid}`}>
                <div className={styles.screenGradient} style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a0533 100%)' }} />
                <span className={styles.screenLabel}>PRODUCT FILM</span>
              </div>
              <div className={`${styles.screen} ${styles.screenFront}`}>
                <div className={styles.screenGradient} style={{ background: 'linear-gradient(135deg, #111318 0%, #1e1040 100%)' }} />
                
                {/* Center glowing play button */}
                <div className={styles.playButton}>
                  <Play size={24} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '4px' }} />
                </div>

                {/* Animated sound wave bars */}
                <div className={styles.miniWaveform}>
                  {[10, 24, 38, 18, 42, 30, 48, 20, 34, 16].map((h, i) => (
                    <span
                      key={i}
                      className={styles.miniWaveBar}
                      style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>

                <span className={styles.screenLabel}>COMMERCIAL</span>
              </div>
            </div>

            {/* Film strip bottom */}
            <div className={styles.filmStrip}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.perforation} />
              ))}
            </div>

            {/* Floating label */}
            <div className={styles.reelOverlayBadge}>
              <Sparkles size={14} color="#8B5CF6" />
              <span>CLICK TO PLAY STUDIO REEL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-label="Scroll down">
        <span className={styles.scrollLabel}>SCROLL TO EXPLORE</span>
        <div className={styles.chevron}>&#8964;</div>
      </div>

      {/* ── SHOWREEL VIDEO MODAL ── */}
      {showReelModal && (
        <div className={styles.modalOverlay} onClick={() => setShowReelModal(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowReelModal(false)}
              aria-label="Close Showreel"
            >
              <X size={22} />
            </button>

            <div className={styles.modalVideoScreen}>
              <div className={styles.modalScreenOverlay} />
              
              <div className={styles.modalHeaderOSD}>
                <div className={styles.recDotRow}>
                  <span className={styles.liveRecDot} />
                  <span>MOTIONVERSE AGENCY SHOWREEL 2025</span>
                </div>
                <div className={styles.fpsBadge}>DCI 4K &bull; PRORES 4444</div>
              </div>

              {/* Center Play/Pause */}
              <button
                className={styles.modalPlayBtn}
                onClick={() => setIsPlayingReel(!isPlayingReel)}
              >
                {isPlayingReel ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
              </button>

              {/* Bottom Scrubber */}
              <div className={styles.modalBottomControls}>
                <div className={styles.modalTrack}>
                  <div className={styles.modalTrackFill} />
                </div>
                <div className={styles.modalMetaRow}>
                  <div className={styles.modalLeftMeta}>
                    <button
                      className={styles.iconBtn}
                      onClick={() => setIsPlayingReel(!isPlayingReel)}
                    >
                      {isPlayingReel ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button
                      className={styles.iconBtn}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <span className={styles.timecodeText}>00:01:42 / 00:02:45</span>
                  </div>
                  <a
                    href="#contact"
                    className="btn-primary"
                    onClick={() => setShowReelModal(false)}
                    style={{ padding: '8px 20px', fontSize: '13px' }}
                  >
                    Discuss Your Video <ArrowRight size={14} style={{ marginLeft: '4px', verticalAlign: '-2px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
