"use client";

import Banner from "@/components/layout/Banner/Banner";
import CustomButton from "@/components/ui/CustomButton";
import Container from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Image from "next/image";

export default function Home() {
  const t = useTranslations("Home");
  const faqs = [
    {
      question: t("faq.q1.question"),
      answer: t("faq.q1.answer"),
    },
    {
      question: t("faq.q2.question"),
      answer: t("faq.q2.answer"),
    },
    {
      question: t("faq.q3.question"),
      answer: t("faq.q3.answer"),
    },
    {
      question: t("faq.q4.question"),
      answer: t("faq.q4.answer"),
    },
    {
      question: t("faq.q5.question"),
      answer: t("faq.q5.answer"),
    },
    {
      question: t("faq.q6.question"),
      answer: t("faq.q6.answer"),
    },
    {
      question: t("faq.q7.question"),
      answer: t("faq.q7.answer"),
    },
    {
      question: t("faq.q8.question"),
      answer: t("faq.q8.answer"),
    },
    {
      question: t("faq.q9.question"),
      answer: t("faq.q9.answer"),
    },
    {
      question: t("faq.q10.question"),
      answer: t("faq.q10.answer"),
    },
    {
      question: t("faq.q11.question"),
      answer: t("faq.q11.answer"),
    },
    {
      question: t("faq.q12.question"),
      answer: t("faq.q12.answer"),
    },
  ];

  return (
    <>
      {/* Banner */}
      <Banner />

      {/* Beneficios */}
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-6 mb-4 p-4 mt-10">
          {/* Tarifa baixa */}
          <div className="max-w-[400px]">
            <div className="flex items-center gap-2 mb-2">
              <Image
                src="/images/icones/money-icon.png"
                alt="Ícone de dinheiro"
                width={24}
                height={24}
              />
              <h3 className="text-secondary font-bold text-lg">{t("benefits.tarifasBaixasTitulo")}</h3>
            </div>
            <p className="text-primary text-sm">
              {t("benefits.tarifasBaixasDescricao")}
            </p>
          </div>

          {/* Rapidez */}
          <div className="max-w-[400px]">
            <div className="flex items-center gap-2 mb-2">
              <Image
                src="/images/icones/rapidez-icon.png"
                alt="Ícone de dinheiro"
                width={24}
                height={24}
              />
              <h3 className="text-secondary font-bold text-lg">{t("benefits.rapidezTitulo")}</h3>
            </div>
            <p className="text-primary text-sm">
              {t("benefits.rapidezDescricao")}
            </p>
          </div>

          {/* Transparência */}
          <div className="max-w-[400px]">
            <div className="flex items-center gap-2 mb-2">
              <Image
                src="/images/icones/transparencia-icon.png"
                alt="Ícone de dinheiro"
                width={24}
                height={24}
              />
              <h3 className="text-secondary font-bold text-lg">{t("benefits.transparenciaTitulo")}</h3>
            </div>
            <p className="text-primary text-sm">
              {t("benefits.transparenciaDescricao")}
            </p>
          </div>
        </div>
      </Container>

      {/* Banner intro - DESKTOP */}
      <section
        className="hidden md:block w-full bg-no-repeat bg-cover bg-[url('/images/destaques/Banner_Dinero_Home.png')] aspect-[2.057]"
      >
        <div className="mx-auto max-w-[1440px] px-4 md:px-12 lg:px-[80px] py-20 md:pt-32 lg:pt-48 lg:pb-12">
          <div className="max-w-[500px] space-y-4 text-white">
            <p className="text-3xl font-bold text-secondary">
              {t("bannerIntro.title")}
            </p>
            <p className="text-lg text-primary">
              {t("bannerIntro.description")}
            </p>
            <CustomButton text={t("bannerIntro.button")} onClick={() => { }} />
          </div>
        </div>
      </section>

      {/* Banner intro - MOBILE */}
      <section className="relative block md:hidden w-full min-h-[500px] max-h-[700px]">
        <Image
          src="/images/destaques/Mobile_Teste_GGG.png"
          alt="Banner mobile"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute top-0 left-0 w-full h-full flex items-start justify-start px-4 mt-[55px]">
          <div className="space-y-2 text-white p-4">
            <p className="text-xl font-bold text-secondary max-w-[206px]">
              {t("bannerIntro.title")}
            </p>
            <p className="text-sm text-primary max-w-[195px]">
              {t("bannerIntro.description")}
            </p>
            <CustomButton
              text={t("bannerIntro.button")}
              className="w-full mt-4"
              onClick={() => { }}
            />
          </div>
        </div>
      </section>


      {/* Conexão - DESKTOP */}
      <section className="mt-30 mb-30 hidden md:block">
        <Container>
          <div className="flex flex-col gap-4 items-center justify-center">
            <span className="flex items-center gap-4">
              <p className="text-black font-semibold text-4xl">{t("conexao.linha1parte1")}</p>
              <img
                src="/images/destaques/Mulher_Seta.png"
                alt="Banner Dinero Desktop"
              />
              <p className="text-black font-semibold text-4xl">{t("conexao.linha1parte2")}</p>
            </span>

            <span className="flex items-center gap-4 -mt-6">
              <p className="text-black font-semibold text-4xl">{t("conexao.linha2parte1")}</p>
              <img
                src="/images/destaques/Piramede_Seta.png"
                alt="Banner Dinero Desktop"
              />
              <p className="text-black font-semibold text-4xl">{t("conexao.linha2parte2")}.</p>
            </span>
          </div>

          <div className="flex flex-col gap-10 items-center justify-center mt-10">
            <p className="text-primary text-base max-w-xl text-center">{t("conexao.descricao")}</p>
            <CustomButton text={t("conexao.botao")} onClick={() => { }} />
          </div>
        </Container>
      </section>

      {/* Conexão - MOBILE */}
      <section className="mt-20 mb-20 block md:hidden p-4 ">
        <Container>
          <div className="flex flex-col gap-4 items-center justify-center">
            <span className="flex flex-col items-center gap-4">
              <img
                src="/images/destaques/conexoes-mobile.png"
                alt="Banner Dinero Mobile"
              />
              <p className="text-black font-semibold text-2xl text-center">
                {t("conexao.fulltext")}
              </p>
            </span>
          </div>

          <div className="flex flex-col gap-10 items-center justify-center mt-10">
            <p className="text-primary text-base max-w-xs text-center">{t("conexao.descricao")}</p>
            <CustomButton text={t("conexao.botao")} onClick={() => { }} className="w-full" />
          </div>
        </Container>
      </section>

      {/* Banner secundario - DESKTOP */}
      <section
        className="hidden md:block w-full bg-no-repeat bg-cover bg-[url('/images/destaques/Banner_Cafe.png')] aspect-[2.057] relative mb-20"
      >
        <div className="mx-auto max-w-[1440px] px-4 md:px-12 lg:px-[80px] h-full">
          <div className="flex h-full items-center">
            <div className="ml-auto max-w-[500px] space-y-6 text-white text-left mt-20">
              <p className="text-3xl font-bold">
                {t("bannerSecond.title")}
              </p>
              <p className="text-lg">
                {t("bannerSecond.description")}
              </p>
              <CustomButton text={t("bannerSecond.button")} onClick={() => { }} />
            </div>
          </div>
        </div>
      </section>

      {/* Banner secundario - MOBILE */}
      <section className="relative block md:hidden w-full">
        <Image
          src="/images/destaques/Mobile_Banner_Cafe.png"
          alt="Banner Mobile"
          width={750}
          height={500}
          className="w-full h-auto"
        />

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-4 mt-[60px]">
          <div className="space-y-2 text-white p-4 text-center max-w-md w-full">
            <p className="text-xl font-bold mx-auto max-w-xs ">
              {t("bannerSecond.title")}
            </p>
            <p className="text-sm mx-auto max-w-xs">
              {t("bannerSecond.description")}
            </p>
            <CustomButton
              text={t("bannerSecond.button")}
              className="w-full mt-4"
              onClick={() => { }}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-6">
            <div className="w-full flex flex-col gap-4 max-w-[500px] p-4">
              <p className="text-3xl font-bold">Perguntas Frequentes</p>
              <p className="text-base mt-4 text-primary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <CustomButton
                text={t("bannerSecond.button")}
                onClick={() => { }}
                className="mt-4 inline-block self-start"
              />
            </div>
            <div className="w-full p-4">
              <dl className="divide-y divide-[#C1C1C1]">
                {faqs.map((faq) => (
                  <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                    <dt>
                      <DisclosureButton className="group flex w-full items-start justify-between text-left text-primary">
                        <span className="text-xl font-semibold text-black">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <PlusSmallIcon aria-hidden="true" className="size-6 group-data-open:hidden" />
                          <MinusSmallIcon aria-hidden="true" className="size-6 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-primary">{faq.answer}</p>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
