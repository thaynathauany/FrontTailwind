import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function Footer() {
    const t = await getTranslations("Footer");

    return (
        <>
            {/* Seção branca com imagem sobreposta */}
            <section className="relative w-full z-10">
                <div className="flex justify-center items-end h-[100px] sm:h-[140px] relative">
                    <Image
                        src="/images/logos/logo-footer.png"
                        alt="Imagem Centralizada"
                        width={90}
                        height={20}
                        className="h-auto object-contain absolute bottom-0 z-20 translate-y-1/2"
                    />
                </div>
            </section>

            {/* FOOTER DESKTOP */}
            <footer className="hidden md:block bg-[#03a5a8] text-white pt-28 pb-12 relative overflow-hidden z-0 h-[510px]">
                <div className="mx-auto max-w-[1440px] px-4 md:px-12 lg:px-[80px]">
                    <div className="flex flex-wrap justify-between gap-10 items-start">
                        {/* Coluna 1 */}
                        <div className="w-[320px] space-y-4">
                            <h3 className="text-lg font-semibold">{t("company")}</h3>
                            <p className="text-sm w-[220px]">
                                {t("description")} <br />
                                <span className="font-semibold">{t("slogan")}</span>
                            </p>
                            <div className="text-xs text-white/80 space-x-2">
                                <a href="#" className="underline">{t("privacy")}</a>
                                <span>•</span>
                                <a href="#" className="underline">{t("terms")}</a>
                            </div>
                        </div>

                        {/* Coluna 2 */}
                        <div className="w-[120px] space-y-4">
                            <h3 className="text-sm font-semibold">{t("navigate")}</h3>
                            <ul className="space-y-1 text-sm">
                                <li><a href="#">{t("nav_home")}</a></li>
                                <li><a href="#">{t("nav_about")}</a></li>
                                <li><a href="#">{t("nav_transfers")}</a></li>
                                <li><a href="#">{t("nav_contact")}</a></li>
                            </ul>
                        </div>

                        {/* Coluna 3 */}
                        <div className="w-[130px] space-y-4">
                            <h3 className="text-sm font-semibold">{t("follow_us")}</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-center gap-2">
                                    <Image src="/images/logos/instagram-logo.png" alt="Instagram" width={24} height={24} />
                                    <a href="#">{t("social_instagram")}</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Image src="/images/logos/facebook-logo.png" alt="Facebook" width={24} height={24} />
                                    <a href="#">{t("social_facebook")}</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Image src="/images/logos/youtube-logo.png" alt="YouTube" width={24} height={24} />
                                    <a href="#">{t("social_youtube")}</a>
                                </li>
                            </ul>
                        </div>

                        {/* Coluna 4 */}
                        <div className="w-[220px] space-y-4 flex flex-col items-end">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Image src="/images/logos/telefone-logo.png" alt="WhatsApp" width={24} height={24} />
                                <span>{t("phone_number")}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <p className="text-sm text-end w-[170px]">{t("phone_text")}</p>
                                <a href="#">
                                    <Image src="/images/vetores/arrow-footer.png" alt="Arrow" width={32} height={32} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Marca d’água */}
                <div className="absolute bottom-0 left-0 right-0 z-[-1] pointer-events-none">
                    <div className="mx-auto max-w-[1440px] px-4 md:px-12 lg:px-[80px]">
                        <Image
                            src="/images/logos/dinerolatam-footer.png"
                            alt="Marca d’água"
                            width={1333}
                            height={300}
                            className="max-w-full"
                        />
                    </div>
                </div>
            </footer>

            {/* FOOTER MOBILE */}
            <footer className="md:hidden bg-[#03a5a8] text-white pt-20 pb-10 px-8 relative z-0 overflow-hidden">
                <div className="flex flex-col items-center text-center space-y-8">
                    <h3 className="text-2xl font-bold">{t("company")}</h3>

                    <p className="text-base max-w-xs leading-relaxed">
                        {t("description")} <br />
                        <span className="font-semibold">{t("slogan")}</span>
                    </p>

                    <div className="space-y-2">
                        <h4 className="text-base font-semibold">{t("follow_us")}</h4>
                        <div className="flex gap-4 justify-center">
                            <Image src="/images/logos/instagram-logo.png" alt="Instagram" width={24} height={24} />
                            <Image src="/images/logos/facebook-logo.png" alt="Facebook" width={24} height={24} />
                            <Image src="/images/logos/youtube-logo.png" alt="YouTube" width={24} height={24} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-base font-medium">
                        <Image src="/images/logos/telefone-logo.png" alt="WhatsApp" width={24} height={24} />
                        <span>{t("phone_number")}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="text-sm text-center max-w-[180px]">{t("phone_text")}</p>
                        <a href="#">
                            <Image src="/images/vetores/arrow-footer.png" alt="Arrow" width={32} height={32} />
                        </a>
                    </div>

                    <div className="text-xs text-white/80 space-x-2 pt-4 pb-6">
                        <a href="#" className="underline">{t("privacy")}</a>
                        <span>•</span>
                        <a href="#" className="underline">{t("terms")}</a>
                    </div>
                </div>

                {/* Marca d’água mobile */}
                <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-[-1]">
                    <span className="text-5xl font-extrabold opacity-50 text-btnsecondary text-center leading-none tracking-tight mb-[-10px]">
                        DINERO LATAM
                    </span>
                </div>
            </footer>
        </>
    );
}