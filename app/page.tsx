'use client'

import Hero from '@/components/Hero/Hero'
import Marquee from '@/components/Marquee/Marquee'
import Services from '@/components/Services/Services'
import Portfolio from '@/components/Portfolio/Portfolio'
import Process from '@/components/Process/Process'
import WhyUs from '@/components/WhyUs/WhyUs'
import Industries from '@/components/Industries/Industries'
import About from '@/components/About/About'
import Testimonials from '@/components/Testimonials/Testimonials'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'
import { useEffect, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './page.module.css'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  useScrollReveal()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const totalScrollable = documentHeight - windowHeight
      if (totalScrollable <= 0) {
        setScrollProgress(0)
        return
      }
      const progress = (scrollY / totalScrollable) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main>
      <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }} />
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <Process />
      <WhyUs />
      <Industries />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
