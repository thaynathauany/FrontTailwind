"use client"
import { useEffect } from "react"
import { useLocale } from "next-intl"
import { useLanguageStore } from "@/store/languageStore"

export default function LocaleBridge({ children }: { children: React.ReactNode }) {
    const intlLocale = useLocale() as 'pt' | 'es'
    const { locale, setLocale } = useLanguageStore()

    useEffect(() => {
        if (locale !== intlLocale) {
            setLocale(intlLocale)
        }
    }, [intlLocale])

    return <>{children}</>
}