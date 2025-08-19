"use client";

import CustomButton from "@/components/ui/CustomButton";
import Container from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import Image from "next/image";

import bannerMobile from "@/../public/images/destaques/Mobile_Banner_Como_Funciona.png";
import bannerDesktop from "@/../public/images/destaques/Banner_Como_Funciona.png";

export default function HowItWorksSection() {
    const t = useTranslations("HowItWorks");

    const steps = [
        { numberImage: "/images/icones/n1.png", title: t("step1.title"), desc: t("step1.desc") },
        { numberImage: "/images/icones/n2.png", title: t("step2.title"), desc: t("step2.desc") },
        { numberImage: "/images/icones/n3.png", title: t("step3.title"), desc: t("step3.desc") },
        { numberImage: "/images/icones/n4.png", title: t("step4.title"), desc: t("step4.desc") },
        { numberImage: "/images/icones/n5.png", title: t("step5.title"), desc: t("step5.desc") },
        { numberImage: "/images/icones/n6.png", title: t("step6.title"), desc: t("step6.desc") },
    ];

    return (
        <section className="bg-white mt-[120px]">
            {/* MOBILE Banner */}
            <section className="relative block md:hidden w-full">
                <div className="relative mx-auto max-w-[430px] w-full h-[360px]">
                    <Image
                        src={bannerMobile}
                        alt="Banner Como Funciona (mobile)"
                        fill
                        priority
                        fetchPriority="high"
                        quality={90}
                        placeholder="blur"
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-start px-4 mt-10">
                        <div className="text-black max-w-[200px] space-y-2 px-4">
                            <h2 className="text-[24px] font-bold">{t("title")}</h2>
                            <p className="text-primary">{t("description")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* DESKTOP Banner */}
            <section className="relative hidden md:block w-full h-[480px]">
                <div className="relative mx-auto max-w-[1440px] w-full h-full">
                    <Image
                        src={bannerDesktop}
                        alt="Banner Como Funciona (desktop)"
                        fill
                        priority
                        fetchPriority="high"
                        quality={90}
                        placeholder="blur"
                        sizes="(min-width: 768px) 100vw, 0vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-end justify-start">
                        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[80px]">
                            <div className="w-[448px] pb-20 px-4">
                                <h2 className="text-[30px] font-bold text-black mb-2">{t("title")}</h2>
                                <p className="text-primary font-normal text-lg">{t("description")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Etapas */}
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mt-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative rounded-lg border border-[#CBCBCB] p-6 pt-10 text-sm bg-white min-h-[300px] flex flex-col items-center gap-4"
                        >
                            <img
                                src={step.numberImage}
                                alt={`Etapa ${index + 1}`}
                                className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12"
                                loading="lazy"
                            />
                            <h3 className="text-secondary font-semibold text-xl text-center mb-2">{step.title}</h3>
                            <p className="text-center sm:text-left font-normal text-primary whitespace-pre-line">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </Container>

            {/* CTA final */}
            <Container>
                <div className="text-center bg-white p-4 py-12">
                    <h3 className="text-2xl sm:text-4xl font-bold text-secondary mb-6">{t("footerTitle")}</h3>
                    <p className="text-primary font-normal mb-6 mt-2 ">{t("footerDesc")}</p>
                    <CustomButton text={t("button")} onClick={() => { }} />
                </div>
            </Container>
        </section>
    );
}