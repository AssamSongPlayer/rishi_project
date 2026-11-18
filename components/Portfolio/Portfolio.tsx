'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import styles from './Portfolio.module.css';

interface Project {
  id: number;
  title: string;
  brand: string;
  category: string;
  industry: string;
  description: string;
  duration: string;
  thumbnailGradient: string;
  tags: string[];
  director: string;
  camera: string;
  aspectRatio: string;
  colorGrade: string;
  impactMetric: string;
  impactLabel: string;
  clientQuote: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Aurora Tech Launch',
    brand: 'Aurora Technologies',
    category: 'Brand Films',
    industry: 'Technology',
    description: 'A cinematic brand launch film showcasing next-generation quantum computing with emotive visual storytelling.',
    duration: '2:30',
    thumbnailGradient: 'linear-gradient(135deg, #1E1B4B 0%, #4F8CFF 50%, #8B5CF6 100%)',
    tags: ['Brand Film', 'Tech', 'Launch'],
    director: 'Julian Vance',
    camera: 'ARRI Alexa 35 & Cooke Anamorphic /i',
    aspectRatio: '2.39:1 Cinemascope',
    colorGrade: 'Custom Film Print Emulation (Kodak 2383)',
    impactMetric: '+380%',
    impactLabel: 'Enterprise Pipeline Growth',
    clientQuote: 'The visual execution set a new benchmark in our category.'
  },
  {
    id: 2,
    title: 'Velvet Couture SS24',
    brand: 'Velvet Fashion',
    category: 'Product Ads',
    industry: 'Fashion',
    description: 'Luxury high-fashion editorial commercial capturing tactile textures, ethereal lighting, and haute couture.',
    duration: '0:45',
    thumbnailGradient: 'linear-gradient(135deg, #4C0519 0%, #8B5CF6 50%, #EC4899 100%)',
    tags: ['Fashion', 'Campaign', 'Luxury'],
    director: 'Sienna Dubois',
    camera: 'RED V-Raptor XL 8K VV',
    aspectRatio: '4:5 Social & 16:9 Broadcast',
    colorGrade: 'High-Contrast Ektachrome LUT',
    impactMetric: '18.4M',
    impactLabel: 'Targeted Impressions',
    clientQuote: 'It elevated our collection into a worldwide cultural conversation.'
  },
  {
    id: 3,
    title: 'DriveX EV Campaign',
    brand: 'DriveX Motors',
    category: 'Brand Films',
    industry: 'Automotive',
    description: 'High-octane commercial fusing aerodynamic sound design, high-speed tracking shots, and raw electric power.',
    duration: '1:00',
    thumbnailGradient: 'linear-gradient(135deg, #082F49 0%, #0284C7 50%, #06B6D4 100%)',
    tags: ['Automotive', 'EV', 'Commercial'],
    director: 'Marcus Kane',
    camera: 'Porsche Panamera Camera Car + Shotover F1',
    aspectRatio: '2.35:1 Anamorphic',
    colorGrade: 'Cool Cyan & Amber Split Tone',
    impactMetric: '4.2x',
    impactLabel: 'Pre-Order Conversion Rate',
    clientQuote: 'Cinematography that genuinely gave our audience goosebumps.'
  },
  {
    id: 4,
    title: 'Vitality Health Reel',
    brand: 'Vitality Co.',
    category: 'Social Media',
    industry: 'Healthcare',
    description: 'Dynamic short-form campaign engineered for algorithmic retention, authentic rhythm, and bio-wellness appeal.',
    duration: '0:30',
    thumbnailGradient: 'linear-gradient(135deg, #064E3B 0%, #10B981 50%, #14B8A6 100%)',
    tags: ['Health', 'Social', 'Reel'],
    director: 'Clara Mendez',
    camera: 'Sony FX9 & Master Anamorphic Primes',
    aspectRatio: '9:16 Vertical Video',
    colorGrade: 'Natural Luminescence & Skin Tones',
    impactMetric: '+210%',
    impactLabel: 'Direct-to-Consumer Sales',
    clientQuote: 'Turned viewers into loyal brand advocates within seconds.'
  },
  {
    id: 5,
    title: 'Nexus App Launch',
    brand: 'Nexus Digital',
    category: 'Motion Graphics',
    industry: 'Technology',
    description: 'Hypnotic 3D motion graphics and UI choreography demonstrating fluid multi-platform collaboration.',
    duration: '1:15',
    thumbnailGradient: 'linear-gradient(135deg, #312E81 0%, #6366F1 50%, #4F8CFF 100%)',
    tags: ['App', 'Motion', 'Animation'],
    director: 'Devon Rhys',
    camera: 'Houdini FX + Cinema 4D Octane Engine',
    aspectRatio: '16:9 4K UHD',
    colorGrade: 'Cyberpunk Neon Spectrum',
    impactMetric: '1.2M',
    impactLabel: 'First-Week App Downloads',
    clientQuote: 'The 3D transitions made complex tech feel effortlessly magical.'
  },
  {
    id: 6,
    title: 'Summit Corp Profile',
    brand: 'Summit Corporation',
    category: 'Corporate',
    industry: 'Corporate',
    description: 'Prestige corporate anthem film communicating global governance, clean energy, and generational leadership.',
    duration: '3:00',
    thumbnailGradient: 'linear-gradient(135deg, #1F2937 0%, #3B82F6 50%, #64748B 100%)',
    tags: ['Corporate', 'B2B', 'Profile'],
    director: 'Arthur Pendelton',
    camera: 'ARRI Mini LF & Zeiss Supreme Primes',
    aspectRatio: '2:1 Univisium',
    colorGrade: 'Timeless Monolithic Contrast',
    impactMetric: '$140M',
    impactLabel: 'Investor Round Backing',
    clientQuote: 'Our leadership film galvanized investors across 4 continents.'
  },
];

const FILTERS = ['All Projects', 'Brand Films', 'Product Ads', 'Corporate', 'Social Media', 'Motion Graphics'];

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(38);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects =
    activeFilter === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Stagger cards when filter changes
  useEffect(() => {
    setVisibleCards([]);
    const timers: ReturnType<typeof setTimeout>[] = [];
    filteredProjects.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleCards((prev) => [...prev, i]);
      }, i * 80);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [activeFilter, filteredProjects.length]);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  // Simulated video playback progress ticker
  useEffect(() => {
    if (!activeModalProject || !isPlaying) return;
    const interval = setInterval(() => {
      setPlaybackProgress((prev) => (prev >= 98 ? 10 : prev + 1.2));
    }, 400);
    return () => clearInterval(interval);
  }, [activeModalProject, isPlaying]);

  return (
    <section id="portfolio" className={`section-padding ${styles.portfolio}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={`section-label ${styles.sectionLabel}`}>
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
            FEATURED PORTFOLIO
          </span>
          <h2 className={styles.heading}>
            SELECTED WORK.
            <br />
            <span className="gradient-text">BIG IMPACT.</span>
          </h2>
          <p className={styles.subtext}>
            Explore our curated showcase of cinematic advertisements, brand films, and campaigns produced for world-class enterprises.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filters}>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`${styles.card} ${visibleCards.includes(i) ? styles.cardVisible : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
              onClick={() => {
                setActiveModalProject(project);
                setIsPlaying(true);
              }}
            >
              {/* Thumbnail */}
              <div className={styles.thumbnailWrapper}>
                <div
                  className={styles.thumbnail}
                  style={{ background: project.thumbnailGradient }}
                />
                
                {/* Cinema Noise overlay */}
                <div className={styles.thumbnailOverlay} />

                {/* Scanline aesthetic */}
                <div className={styles.scanlines} />

                {/* CONCEPT DEMO badge */}
                <span className={styles.demoBadge}>CONCEPT DEMO</span>

                {/* Play button */}
                <div className={styles.playBtn} aria-label={`Preview ${project.title}`}>
                  <PlayIcon />
                </div>

                {/* Duration */}
                <span className={styles.duration}>{project.duration}</span>

                {/* 4K Badge */}
                <span className={styles.resBadge}>4K RAW</span>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <div className={styles.cardHeaderRow}>
                  <span className={styles.brandName}>{project.brand}</span>
                  <span className={styles.industryBadge}>{project.industry}</span>
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>

                {/* Tags */}
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.viewProjectRow}>
                  <span className={styles.viewProject}>
                    Watch Showcase <ArrowRight size={16} />
                  </span>
                  <span className={styles.impactHighlight}>{project.impactMetric} {project.impactLabel.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>Seeking a custom commercial concept for your brand?</p>
          <p className={styles.ctaSub}>
            We develop bespoke visual treatments from scratch tailored to your exact marketing objectives.
          </p>
          <a href="#contact" className="btn-primary">
            Request Concept Deck
          </a>
        </div>
      </div>

      {/* ── CINEMATIC 4K VIDEO MODAL ── */}
      {activeModalProject && (
        <div className={styles.modalOverlay} onClick={() => setActiveModalProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className={styles.modalCloseBtn}
              onClick={() => setActiveModalProject(null)}
              aria-label="Close Preview"
            >
              <X size={24} />
            </button>

            {/* Simulated 4K Player Screen */}
            <div className={styles.playerContainer} style={{ background: activeModalProject.thumbnailGradient }}>
              {/* Scanlines & Grain */}
              <div className={styles.playerOverlay} />

              {/* Top Meta Bar */}
              <div className={styles.playerTopBar}>
                <div className={styles.recIndicator}>
                  <span className={styles.recDot} />
                  <span>PLAYING &bull; 4K 60FPS</span>
                </div>
                <div className={styles.playerProjectName}>
                  {activeModalProject.title} &bull; {activeModalProject.brand}
                </div>
                <div className={styles.aspectIndicator}>
                  {activeModalProject.aspectRatio}
                </div>
              </div>

              {/* Center Play/Pause Overlay Animation */}
              <button
                className={styles.centerPlayBtn}
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>

              {/* Audio Waveform Visualizer */}
              <div className={styles.waveformContainer}>
                {[12, 28, 45, 18, 55, 78, 62, 34, 85, 92, 48, 65, 30, 70, 42, 88, 50, 24, 60, 38].map((h, idx) => (
                  <span
                    key={idx}
                    className={`${styles.waveBar} ${isPlaying ? styles.waveActive : ''}`}
                    style={{
                      height: isPlaying ? `${h}%` : '15%',
                      animationDelay: `${idx * 0.05}s`
                    }}
                  />
                ))}
              </div>

              {/* Player Bottom Controls Bar */}
              <div className={styles.playerBottomBar}>
                {/* Scrub Progress Bar */}
                <div
                  className={styles.scrubberTrack}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setPlaybackProgress(Math.max(5, Math.min(98, (clickX / rect.width) * 100)));
                  }}
                >
                  <div
                    className={styles.scrubberFill}
                    style={{ width: `${playbackProgress}%` }}
                  />
                </div>

                <div className={styles.controlsRow}>
                  <div className={styles.leftControls}>
                    <button
                      className={styles.controlIconBtn}
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button
                      className={styles.controlIconBtn}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <span className={styles.timecodeText}>
                      00:01:{Math.floor(playbackProgress * 0.6).toString().padStart(2, '0')} / {activeModalProject.duration}
                    </span>
                  </div>

                  <div className={styles.rightControls}>
                    <span className={styles.audioFormatBadge}>DOLBY ATMOS 7.1</span>
                    <button className={styles.controlIconBtn} aria-label="Fullscreen">
                      <Maximize2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Production Specifications Sheet */}
            <div className={styles.specSheet}>
              <div className={styles.specHeader}>
                <div>
                  <span className="section-label">{activeModalProject.category} &bull; {activeModalProject.industry}</span>
                  <h3 className={styles.specTitle}>{activeModalProject.title}</h3>
                  <p className={styles.specBrand}>Produced for {activeModalProject.brand}</p>
                </div>

                <div className={styles.specImpactBox}>
                  <span className={styles.specImpactNum}>{activeModalProject.impactMetric}</span>
                  <span className={styles.specImpactSub}>{activeModalProject.impactLabel}</span>
                </div>
              </div>

              <div className={styles.specQuote}>
                &ldquo;{activeModalProject.clientQuote}&rdquo;
              </div>

              {/* Tech Specs Grid */}
              <div className={styles.techGrid}>
                <div className={styles.techItem}>
                  <span className={styles.techLabel}>Director</span>
                  <span className={styles.techValue}>{activeModalProject.director}</span>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techLabel}>Camera Rig</span>
                  <span className={styles.techValue}>{activeModalProject.camera}</span>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techLabel}>Aspect Ratio</span>
                  <span className={styles.techValue}>{activeModalProject.aspectRatio}</span>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techLabel}>Color Grading</span>
                  <span className={styles.techValue}>{activeModalProject.colorGrade}</span>
                </div>
              </div>

              {/* Modal Action CTA */}
              <div className={styles.modalActionRow}>
                <a
                  href="#contact"
                  className="btn-primary"
                  onClick={() => setActiveModalProject(null)}
                >
                  Commission Similar Project <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: '-3px' }} />
                </a>
                <div className={styles.specDeliverables}>
                  <CheckCircle size={16} color="#10B981" />
                  <span>Delivered in 4K ProRes 4444XQ, DCI-P3 &amp; Web HDR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
