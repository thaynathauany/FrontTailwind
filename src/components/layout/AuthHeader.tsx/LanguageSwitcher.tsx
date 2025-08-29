"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/store/languageStore";
import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type LangCode = "pt" | "es";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguageStore();
    const t = useTranslations("Header");
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => setMounted(true), []);

    const languages = [
        { code: "pt" as const, displayCode: "PT-BR", label: t("portuguese"), img: "/images/flags/flagbrazilbanner.png" },
        { code: "es" as const, displayCode: "ES-MX", label: t("spanish"), img: "/images/flags/flagmexicobanner.png" },
    ] as const;

    if (!mounted) return null;

    const currentLang = languages.find((lang) => lang.code === locale);

    const handleChange = async (langCode: LangCode) => {
        if (langCode === locale) return;

        setLocale(langCode);
        try { localStorage.setItem("locale", langCode); } catch { }

        try {
            await fetch("/api/locale", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ locale: langCode }),
            });
        } catch { }
        startTransition(() => router.refresh());

        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left z-50">
            <button
                onClick={() => setOpen(!open)}
                disabled={pending}
                className="flex items-center gap-2 px-3 py-2"
            >
                {currentLang && (
                    <>
                        <img
                            src={currentLang.img}
                            alt={currentLang.label}
                            className="w-5 h-5 rounded-full"
                        />
                        <span className="text-sm font-medium uppercase">{currentLang.displayCode}</span>
                    </>
                )}
                <ChevronDownIcon className="w-4 h-4 text-white-700" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-30 bg-secondary rounded-md shadow-md border border-[#CBCBCB]">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleChange(lang.code)}
                            className="flex items-center gap-2 px-4 py-2 text-sm w-full"
                        >
                            <img src={lang.img} alt={lang.label} className="w-5 h-5 rounded-full" />
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}