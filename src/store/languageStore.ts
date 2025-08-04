import { create } from 'zustand'

type Locale = 'pt' | 'es'

interface LanguageState {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return 'pt'
  return (localStorage.getItem('locale') as Locale) || 'pt'
}

export const useLanguageStore = create<LanguageState>((set) => ({
  locale: getInitialLocale(),
  setLocale: (locale) => {
    localStorage.setItem('locale', locale)
    set({ locale })
  },
}))