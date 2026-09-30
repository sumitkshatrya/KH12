import { useEffect, useState } from 'react'
import { initialScholarships } from '../data/initialScholarships.js'

const STORAGE_KEY = 'scholardesk.scholarships.v1'

export function useScholarships() {
  const [scholarships, setScholarshipsState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialScholarships
    } catch {
      return initialScholarships
    }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(scholarships)) } catch { /* storage may be disabled */ }
  }, [scholarships])

  const setScholarships = update => setScholarshipsState(current => typeof update === 'function' ? update(current) : update)
  const reset = records => setScholarshipsState(records)
  return { scholarships, setScholarships, reset }
}
