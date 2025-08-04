"use client";

import CustomButton from "@/components/ui/CustomButton";
import { useTranslations } from "next-intl";

export default function HowItWorksSection() {
    const t = useTranslations("HowItWorks");

    const steps = [
        {
            numberImage: "/images/icones/n1.png",
            title: t("step1.title"),
            desc: t("step1.desc"),
        },
        {
            numberImage: "/images/icones/n2.png",
            title: t("step2.title"),
            desc: t("step2.desc"),
        },
        {
            numberImage: "/images/icones/n3.png",
            title: t("step3.title"),
            desc: t("step3.desc"),
        },
        {
            numberImage: "/images/icones/n4.png",
            title: t("step4.title"),
            desc: t("step4.desc"),
        },
        {
            numberImage: "/images/icones/n5.png",
            title: t("step5.title"),
            desc: t("step5.desc"),
        },
        {
            numberImage: "/images/icones/n6.png",
            title: t("step6.title"),
            desc: t("step6.desc"),
        },
    ];

    return (
        <section className="bg-white mt-[120px]">
            <div
                className="w-full bg-no-repeat bg-cover bg-center relative mt-[-30px] mb-10
             bg-[url('/images/destaques/Banner_Como_Funciona_Mobile.png')]
             md:bg-[url('/images/destaques/Banner_Como_Funciona.png')]"
            >
                <div className="relative z-10 h-full min-h-[300px] md:aspect-[3/1]">
                    <div className="h-full w-full max-w-7xl mx-auto px-4 md:px-20 flex flex-col justify-center items-start text-left">
                        <div className="w-md mt-30">
                            <h2 className="text-3xl font-bold text-black mb-2">{t("title")}</h2>
                            <p className="text-primary font-normal">{t("description")}</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Etapas */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative rounded-lg border border-[#CBCBCB] p-6 pt-10 text-sm bg-white min-h-[300px] flex flex-col items-center gap-4"
                        >
                            <img
                                src={step.numberImage}
                                alt={`Etapa ${index + 1}`}
                                className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12"
                            />
                            <h3 className="text-secondary font-semibold text-xl text-center mb-2">{step.title}</h3>
                            <p className="text-center sm:text-left font-normal text-primary whitespace-pre-line">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call-to-action final */}
            <div className="text-center py-12 bg-white px-4">
                <h3 className="text-2xl sm:text-4xl font-bold text-secondary mb-6">{t("footerTitle")}</h3>
                <p className="text-primary font-normal mb-6 mt-2 mx-auto max-w-2xl">{t("footerDesc")}</p>
                <CustomButton text={t("button")} onClick={() => { }} />
            </div>
        </section>
    );
}