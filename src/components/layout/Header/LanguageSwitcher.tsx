"use client";

import { useState } from "react";
import { useLanguageStore } from "@/store/languageStore";
import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguageStore();
  const t = useTranslations("Header");
  const [open, setOpen] = useState(false);

  const languages = [
    {
      code: "pt",
      displayCode: "PT-BR",
      label: t("portuguese"),
      img: "/images/flags/flagbrazilbanner.png",
    },
    {
      code: "es",
      displayCode: "ES-MX",
      label: t("spanish"),
      img: "/images/flags/flagmexicobanner.png",
    },
  ] as const;

  const currentLang = languages.find((lang) => lang.code === locale);

  const handleChange = (langCode: "pt" | "es") => {
    setLocale(langCode);
    localStorage.setItem("locale", langCode);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white rounded-md"
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
        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-30 bg-white rounded-md shadow-md border border-[#CBCBCB]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-gray-100"
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