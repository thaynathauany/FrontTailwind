import { getTranslations } from "next-intl/server";
import BannerClient from "@/components/client/BannerClient";
import FaqAccordion from "@/components/client/FaqAccordion";
import Benefits from "@/components/server/Benefits";
import HeroIntro from "@/components/server/HeroIntro";
import Connections from "@/components/server/Connections";
import SecondaryHero from "@/components/server/SecondaryHero";

export default async function Home() {
  const t = await getTranslations("Home");

  const faqs = Array.from({ length: 12 }).map((_, i) => ({
    question: t(`faq.q${i + 1}.question`),
    answer: t(`faq.q${i + 1}.answer`),
  }));

  return (
    <>
      <BannerClient />

      {/* Server-only (estático) */}
      <Benefits t={t} />

      {/* Server-only (imagens + texto) */}
      <HeroIntro t={t} />

      <Connections t={t} />

      <SecondaryHero t={t} />

      <FaqAccordion
        faqs={faqs}
        heading="Perguntas Frequentes"
        ctaLabel={t("bannerSecond.button")}
      />
    </>
  );
}