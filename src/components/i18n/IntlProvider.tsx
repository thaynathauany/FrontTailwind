"use client";

import { useLanguageStore } from "@/store/languageStore";
import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";
import { loadMessages } from "@/lib/i18n";

export default function IntlProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useLanguageStore();
  const [messages, setMessages] = useState<any>(null);

  useEffect(() => {
    loadMessages(locale).then(setMessages);
  }, [locale]);

  if (!messages) return null;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
