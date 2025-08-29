// src/components/server/SecondaryHero.tsx
import Image from "next/image";
import Container from "@/components/ui/Container";

export default function SecondaryHero({ t }: { t: (key: string) => string }) {
    return (
        <>
            {/* Desktop */}
            <section className="hidden md:block w-full relative mb-20">
                <div className="relative mx-auto max-w-[1440px] w-full h-[709px]">
                    <Image
                        src="/images/destaques/Banner_Cafe.png"
                        alt="Banner Café"
                        fill
                        priority
                        quality={90}
                        className="object-cover rounded"
                    />
                    <div className="absolute inset-0 flex items-center justify-end px-4 md:px-12 lg:px-[80px]">
                        <div className="max-w-[400px] space-y-6 text-white text-left mt-20">
                            <p className="text-3xl font-bold">{t("bannerSecond.title")}</p>
                            <p className="text-lg">{t("bannerSecond.description")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile */}
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
                        <p className="text-xl font-bold mx-auto max-w-xs">
                            {t("bannerSecond.title")}
                        </p>
                        <p className="text-sm mx-auto max-w-xs">
                            {t("bannerSecond.description")}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}