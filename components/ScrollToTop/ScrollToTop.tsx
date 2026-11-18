'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import styles from './ScrollToTop.module.css'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 400) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisible, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!visible) return null

  return (
    <button 
      onClick={scrollToTop} 
      className={styles.scrollBtn} 
      aria-label="Scroll to top of page"
    >
      <ChevronUp size={20} />
    </button>
  )
}
