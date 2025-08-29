import { create } from 'zustand'

export type Locale = 'pt' | 'es'

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
    document.cookie = `locale=${locale}; Path=/; Max-Age=${60*60*24*365}`
    set({ locale })
  },
}))