import Image from "next/image";

export default function HeroIntro({ t }: { t: (key: string) => string }) {
    return (
        <>
            {/* Desktop */}
            <section className="hidden md:block w-full">
                <div className="grid w-full align-center justify-center">
                    <Image
                        src="/images/destaques/Banner_Dinero_Home.png"
                        alt="Banner Dinero Home"
                        width={1440}
                        height={709}
                        priority
                        quality={90}
                        className="m-w-[1440px] h-[100%] object-cover col-start-1 row-start-1"
                    />
                    <div className="col-start-1 row-start-1 flex items-start justify-start">
                        <div className="mx-auto max-w-[1440px] w-full px-4 md:px-12 lg:px-[80px]">
                            <div className="max-w-[500px] md:max-w-[390px] xl:max-w-[450px] space-y-4 p-4 text-white pt-24 md:pt-18 lg:pt-40">
                                <p className="text-3xl lg:text-3xl md:text-2xl font-bold text-secondary">
                                    {t("bannerIntro.title")}
                                </p>
                                <p className="text-lg md:text-base text-primary">
                                    {t("bannerIntro.description")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile */}
            <section className="relative block md:hidden w-full min-h-[500px] max-h-[700px]">
                <Image
                    src="/images/destaques/Mobile_Banner_Dinero_Mobile.png"
                    alt="Banner mobile"
                    fill
                    quality={90}
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
                    </div>
                </div>
            </section>
        </>
    );
}