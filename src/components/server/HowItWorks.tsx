import Container from "@/components/ui/Container";
import Image from "next/image";
import HowItWorksCTA from "../client/HowItWorksCTA";
import { getTranslations } from "next-intl/server";

export default async function HowItWorks() {
    const t = await getTranslations("HowItWorks");

    const steps = [
        { numberImage: "/images/icones/1.svg", title: t("step1.title"), desc: t("step1.desc") },
        { numberImage: "/images/icones/2.svg", title: t("step2.title"), desc: t("step2.desc") },
        { numberImage: "/images/icones/3.svg", title: t("step3.title"), desc: t("step3.desc") },
        { numberImage: "/images/icones/4.svg", title: t("step4.title"), desc: t("step4.desc") },
        { numberImage: "/images/icones/5.svg", title: t("step5.title"), desc: t("step5.desc") },
        { numberImage: "/images/icones/6.svg", title: t("step6.title"), desc: t("step6.desc") },
    ];

    return (
        <section className="bg-white mt-[120px]">
            {/* MOBILE Banner */}
            <section className="relative block md:hidden w-full">
                <div className="relative mx-auto max-w-[430px] w-full h-[360px]">
                    <Image
                        src="/images/destaques/Mobile_Banner_Como_Funciona.png"
                        alt="Banner Como Funciona"
                        fill
                        priority
                        fetchPriority="high"
                        quality={90}
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-start px-4 mt-10">
                        <div className="text-black max-w-[200px] space-y-2 px-4">
                            <h2 className="text-[24px] leading-[30px] font-bold">{t("title")}</h2>
                            <p className="text-primary">{t("description")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* DESKTOP Banner */}
            <section className="relative hidden md:block w-full h-[480px]">
                <div className="relative mx-auto max-w-[1440px] w-full h-full">
                    <Image
                        src="/images/destaques/Banner_Como_Funciona.png"
                        alt="Banner Como Funciona"
                        fill
                        priority
                        fetchPriority="high"
                        quality={90}
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-end justify-start">
                        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[80px]">
                            <div className="w-[448px] md:w-[230px] lg:w-[448px] pb-20 md:pb-5 lg:pb-20 px-4">
                                <h2 className="text-[30px] font-bold text-black mb-2">{t("title")}</h2>
                                <p className="text-primary font-normal text-lg">{t("description")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Etapas */}
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative rounded-lg border border-[#CBCBCB] p-6 pt-10 text-sm bg-white min-h-[300px] flex flex-col items-center gap-4"
                        >
                            <Image
                                src={step.numberImage}
                                alt={`Etapa ${index + 1}`}
                                width={48}
                                height={48}
                                className="absolute -top-4 left-1/2 -translate-x-1/2"
                            />
                            <h3 className="text-secondary font-semibold text-xl text-center mb-2">
                                {step.title}
                            </h3>
                            <p className="text-center sm:text-left font-normal text-primary whitespace-pre-line">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>

            {/* CTA client*/}
            <Container>
                <HowItWorksCTA
                    title={t("footerTitle")}
                    desc={t("footerDesc")}
                    buttonLabel={t("button")}
                />
            </Container>
        </section>
    );
}