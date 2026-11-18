'use client'

import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          // Once animated, optionally unobserve
          observer.unobserve(entry.target)
        }
      })
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const elements = document.querySelectorAll('.reveal')

    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
      observer.disconnect()
    }
  }, [])
}
