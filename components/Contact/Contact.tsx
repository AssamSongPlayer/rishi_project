'use client';

import { useState, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  Clock,
  Video
} from 'lucide-react';
import {
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@/components/Icons/SocialIcons';
import styles from './Contact.module.css';

interface FormData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  industry: string;
  adType: string;
  budget: string;
  deliveryDate: string;
  description: string;
}

interface FormErrors {
  fullName?: string;
  companyName?: string;
  businessEmail?: string;
  description?: string;
}

const initialForm: FormData = {
  fullName: '',
  companyName: '',
  businessEmail: '',
  phoneNumber: '',
  industry: 'Technology',
  adType: 'Brand Commercial',
  budget: '$15,000 - $30,000',
  deliveryDate: '',
  description: '',
};

const AD_TYPES = [
  'Brand Commercial',
  'Product Advertisement',
  'Social Media Ads',
  'Corporate Video',
  'Motion Graphics & VFX'
];

const BUDGET_OPTIONS = [
  '$5,000 - $15,000',
  '$15,000 - $30,000',
  '$30,000 - $60,000',
  '$60,000+'
];

const INDUSTRIES = [
  'Technology',
  'Fashion & Luxury',
  'Automotive',
  'Food & Beverage',
  'Healthcare & Wellness',
  'Real Estate',
  'Education',
  'Entertainment',
  'Other'
];

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.companyName.trim()) errs.companyName = 'Company name is required';
    if (!form.businessEmail.trim()) {
      errs.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail)) {
      errs.businessEmail = 'Please enter a valid business email';
    }
    if (!form.description.trim()) {
      errs.description = 'Please provide a brief description of your project';
    } else if (form.description.trim().length < 15) {
      errs.description = 'Description should be at least 15 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectAdType = (type: string) => {
    setForm((prev) => ({ ...prev, adType: type }));
  };

  const handleSelectBudget = (budget: string) => {
    setForm((prev) => ({ ...prev, budget }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  const socialLinks = [
    { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
    { icon: YoutubeIcon, label: 'YouTube', href: 'https://youtube.com' },
    { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: TwitterIcon, label: 'Twitter', href: 'https://twitter.com' },
  ];

  const contactCards = [
    { icon: Mail, label: 'Executive Inquiries', value: 'hello@motionverse.agency' },
    { icon: Phone, label: 'Production Desk', value: '+1 (800) 555-MVRSE' },
    { icon: MapPin, label: 'Studios & Representation', value: 'Los Angeles • London • Global' },
  ];

  return (
    <section id="contact" className={styles.contactSection} ref={sectionRef}>
      <div className="container">
        <div className={styles.grid}>
          {/* LEFT COLUMN: Agency Pitch & Details */}
          <div className={`${styles.leftCol} reveal`}>
            <span className="section-label">
              <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
              START A COLLABORATION
            </span>
            <h2 className={styles.heading}>
              HAVE A BRAND?
              <br />
              LET&apos;S MAKE IT
              <br />
              <span className="gradient-text">UNFORGETTABLE.</span>
            </h2>
            <p className={styles.subtext}>
              Tell us about your brand goals. Our Creative Directors review every inquiry and provide a custom creative treatment and production estimate within 24 hours.
            </p>

            {/* Contact Cards */}
            <div className={styles.contactCards}>
              {contactCards.map(({ icon: Icon, label, value }) => (
                <div key={label} className={`${styles.contactCard} glass`}>
                  <div className={styles.cardIcon}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className={styles.cardLabel}>{label}</p>
                    <p className={styles.cardValue}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Assurance Box */}
            <div className={styles.assuranceBox}>
              <div className={styles.assuranceItem}>
                <ShieldCheck size={18} color="#8B5CF6" />
                <span>NDA &amp; Confidentiality Protected</span>
              </div>
              <div className={styles.assuranceItem}>
                <Clock size={18} color="#4F8CFF" />
                <span>24-Hour Executive Response</span>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.socialRow}>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`${styles.socialBtn} glass`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Inquiry Form */}
          <div className={`${styles.rightCol} reveal`}>
            {submitted ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <CheckCircle size={64} color="#10B981" />
                </div>
                <h3 className={styles.successTitle}>Inquiry Successfully Received</h3>
                <p className={styles.successSub}>
                  Thank you, <strong>{form.fullName}</strong>. A MOTIONVERSE Creative Producer has been assigned to <strong>{form.companyName}</strong>. We will review your brief and contact you within 24 business hours.
                </p>
                <div className={styles.successSummaryCard}>
                  <p><strong>Selected Format:</strong> {form.adType}</p>
                  <p><strong>Allocated Budget:</strong> {form.budget}</p>
                  <p><strong>Target Timeline:</strong> {form.deliveryDate || 'Flexible / Q1-Q2'}</p>
                </div>
                <button onClick={handleReset} className="btn-primary" style={{ marginTop: '1.5rem' }}>
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                {/* Contact Basics */}
                <div className={styles.formGrid2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                    />
                    {errors.fullName && <span className={styles.errorMsg}>{errors.fullName}</span>}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Company / Brand Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Global"
                      className={`${styles.input} ${errors.companyName ? styles.inputError : ''}`}
                    />
                    {errors.companyName && (
                      <span className={styles.errorMsg}>{errors.companyName}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGrid2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Business Email *</label>
                    <input
                      type="email"
                      name="businessEmail"
                      value={form.businessEmail}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className={`${styles.input} ${errors.businessEmail ? styles.inputError : ''}`}
                    />
                    {errors.businessEmail && (
                      <span className={styles.errorMsg}>{errors.businessEmail}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Direct Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      placeholder="+1 (555) 019-2834"
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Industry Dropdown */}
                <div className={styles.field}>
                  <label className={styles.label}>Industry Sector</label>
                  <select
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Interactive Ad Type Chips */}
                <div className={styles.field}>
                  <label className={styles.label}>Type of Advertisement Needed</label>
                  <div className={styles.chipGroup}>
                    {AD_TYPES.map((type) => (
                      <button
                        type="button"
                        key={type}
                        className={`${styles.chip} ${form.adType === type ? styles.chipActive : ''}`}
                        onClick={() => handleSelectAdType(type)}
                      >
                        <Video size={14} className={styles.chipIcon} />
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Budget Range Chips */}
                <div className={styles.field}>
                  <label className={styles.label}>Target Production Budget</label>
                  <div className={styles.chipGroup}>
                    {BUDGET_OPTIONS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        className={`${styles.chip} ${form.budget === b ? styles.chipActive : ''}`}
                        onClick={() => handleSelectBudget(b)}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Expected Delivery Date */}
                <div className={styles.field}>
                  <label className={styles.label}>Target Delivery Date (Optional)</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={form.deliveryDate}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                {/* Project Description */}
                <div className={styles.field}>
                  <div className={styles.labelRow}>
                    <label className={styles.label}>Project Vision &amp; Campaign Objectives *</label>
                    <span className={styles.charCount}>{form.description.length} chars</span>
                  </div>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your product, target audience, core message, or any visual references..."
                    className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                  />
                  {errors.description && (
                    <span className={styles.errorMsg}>{errors.description}</span>
                  )}
                </div>

                {/* Scope Estimator Card */}
                <div className={styles.scopePreview}>
                  <span className={styles.scopeLabel}>PROJECT SCOPE ESTIMATION:</span>
                  <div className={styles.scopeGrid}>
                    <div className={styles.scopeItem}>
                      <span className={styles.scopeItemTitle}>Ad Format</span>
                      <span className={styles.scopeItemVal}>{form.adType}</span>
                    </div>
                    <div className={styles.scopeItem}>
                      <span className={styles.scopeItemTitle}>Turnaround</span>
                      <span className={styles.scopeItemVal}>2–4 Weeks</span>
                    </div>
                    <div className={styles.scopeItem}>
                      <span className={styles.scopeItemTitle}>Master Deliverable</span>
                      <span className={styles.scopeItemVal}>4K HDR + Social Cuts</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`${styles.submitBtn} btn-primary`}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className={styles.spinner} />
                      Transmitting Inquiry...
                    </>
                  ) : (
                    'Send Project Inquiry →'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
