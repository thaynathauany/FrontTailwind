"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import CustomButton from "@/components/ui/CustomButton";

export default function AboutSection() {
    const t = useTranslations("About");

    return (
        <>
            <section className="mt-[120px]">
                {/* MOBILE Banner */}
                <div className="relative block md:hidden w-full">
                    <div className="block md:hidden relative w-full aspect-[1.2]">
                        <Image
                            src="/images/destaques/Banner_Sobre_Mobile.png"
                            alt="Banner Sobre Mobile"
                            fill
                            quality={100}
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center px-4 pb-12">
                        <div className="text-white space-y-2 max-w-[320px] text-center">
                            <p className="text-sm font-normal">{t("bannerTitle1")}</p>
                            <p className="text-sm font-semibold">{t("bannerTitle2")}</p>
                        </div>
                    </div>
                </div>

                {/* DESKTOP Banner */}
                <section className="relative hidden md:block w-full max-w-[1440px] mx-auto mt-[120px]">
                    <Image
                        src="/images/destaques/Banner_Sobre.png"
                        alt="Banner Sobre"
                        width={1440}
                        height={710}
                        quality={100}
                        className="w-full h-auto object-cover"
                        priority
                    />

                    <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                        <div className="w-[561px] px-4 text-left ml-[36%] mb-20 text-white">
                            <p className="text-2xl font-normal">{t("bannerTitle1")}</p>
                            <p className="text-2xl font-semibold">{t("bannerTitle2")}</p>
                        </div>
                    </div>
                </section>
            </section>

            {/* content */}
            <div className="flex flex-col md:flex-row w-full mt-20 gap-y-12 md:gap-y-0">
                <div className="w-full md:w-[600px] flex-shrink-0">
                    {/* Imagem desktop */}
                    <div className="hidden md:block">
                        <Image
                            src="/images/destaques/Sobre_IMG_01.png"
                            alt="Imagem Sobre"
                            width={1440}
                            height={0}
                            quality={100}
                            className="w-full h-auto object-contain flex-shrink-0"
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <div className="w-full max-w-[600px] mx-auto px-4 md:px-0">
                        <div className="space-y-6 px-4">
                            <h2 className="text-secondary text-2xl font-bold">
                                {t("title")}
                            </h2>

                            <p className="text-primary text-base font-normal">
                                {t("paragraph1")}
                            </p>

                            <p className="text-primary text-base font-normal">
                                <strong className="text-secondary">{t("highlight")}</strong> {t("paragraph2")}
                            </p>

                            <p className="text-primary text-base font-normal">
                                {t("paragraph3")}
                            </p>

                            <p className="text-primary text-base font-normal whitespace-pre-line">
                                {t("paragraph4")}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Imagem mobile */}
                <div className="block md:hidden">
                    <Image
                        src="/images/destaques/Mobile_Sobre_IMG_01.png"
                        alt="Imagem Sobre Mobile"
                        width={1440}
                        height={0}
                        quality={100}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            <Container>
                <div className="mt-20">
                    <div className="px-4 space-y-4">
                        <h2 className="text-secondary text-2xl font-bold">
                            {t("porQueExistimos")}
                        </h2>
                        <p className="text-primary text-base font-normal leading-relaxed">
                            {t("paragrafoPorQueExistimos")}
                        </p>

                        {["porQueExistimos1", "porQueExistimos2", "porQueExistimos3", "porQueExistimos4"].map((key, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <Image
                                    src="/images/icones/check.png"
                                    alt="Check"
                                    width={20}
                                    height={20}
                                    className="mt-1 w-5 h-5"
                                />
                                <p className="text-primary text-base font-normal">
                                    {t(key)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            <Container>
                <div className="mt-20">
                    <div className="px-4 space-y-4">
                        <h2 className="text-secondary text-2xl font-bold">
                            {t("nossaMissao")}
                        </h2>
                        <p className="text-primary text-base font-normal leading-relaxed">
                            {t("missao1")}
                        </p>
                        <p className="text-primary text-base font-normal leading-relaxed">
                            {t("missao2")}
                        </p>
                        <p className="text-primary text-base font-normal leading-relaxed">
                            {t("missao3")}
                        </p>
                        <p className="text-primary text-base font-normal leading-relaxed">
                            {t("missao4")}
                        </p>
                        <p className="text-primary text-base font-normal leading-relaxed">
                            {t("missao5")}
                            <span className="text-secondary font-semibold"> Dinero Latam</span>.
                        </p>
                        <p className="text-primary text-base font-normal leading-relaxed">
                            {t("missao6")}
                        </p>
                        <p className="text-primary text-base font-normal leading-relaxed">
                            {t("missao7")}
                        </p>
                    </div>
                </div>
            </Container>

            {/* Banner secundario - DESKTOP */}
            <section className="relative hidden md:block w-full max-w-[1440px] mx-auto mb-[-150px]">
                {/* Imagem */}
                <Image
                    src="/images/destaques/Banner_Sobre_2.png"
                    alt="Banner Sobre"
                    width={1440}
                    height={700}
                    priority
                    quality={100}
                    className="w-full h-auto object-cover"
                />

                {/* Texto sobre a imagem */}
                <div className="absolute inset-0 flex items-center">
                    <div className="px-4 md:px-12 lg:px-[80px] w-full">
                        <div className="max-w-[500px] space-y-6 text-white text-left mt-20 px-4">
                            <p className="text-3xl font-bold">{t("bannerSecondTitle")}</p>
                            <p className="text-lg">{t("bannerSecondDescription")}</p>
                            <CustomButton text={t("bannerSecondButton")} onClick={() => { }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Banner secundario - MOBILE */}
            <section className="relative block md:hidden w-full h-[300px] mb-[-100px]">
                {/* Imagem otimizada */}
                <Image
                    src="/images/destaques/Mobile_Sobre_Banner_02.png"
                    alt="Banner Mobile"
                    fill
                    priority
                    quality={100}
                    sizes="100vw"
                    className="object-cover"
                />

                {/* Texto sobreposto */}
                <div className="absolute inset-0 flex items-start px-8 pt-[60px]">
                    <div className="text-white text-left w-[240px]">
                        <p className="text-base font-bold">{t("bannerSecondTitle")}</p>
                        <p className="text-xs">{t("bannerSecondDescription")}</p>
                        <CustomButton
                            text={t("bannerSecondButton")}
                            className="w-full mt-4"
                            onClick={() => { }}
                        />
                    </div>
                </div>
            </section>
        </>

    );
}