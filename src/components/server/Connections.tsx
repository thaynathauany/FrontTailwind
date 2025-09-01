import Container from "@/components/ui/Container";
import Image from "next/image";

export default function Connections({ t }: { t: (key: string) => string }) {
    return (
        <>
            {/* Desktop */}
            <section className="mt-30 mb-30 hidden lg:block">
                <Container>
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <span className="flex items-center gap-4">
                            <p className="text-black font-semibold text-4xl">{t("conexao.linha1parte1")}</p>
                            <Image src="/images/destaques/Mulher_Seta.png" alt="" width={141} height={113} />
                            <p className="text-black font-semibold text-4xl">{t("conexao.linha1parte2")}</p>
                        </span>

                        <span className="flex items-center gap-4 -mt-6">
                            <p className="text-black font-semibold text-4xl">{t("conexao.linha2parte1")}</p>
                            <Image src="/images/destaques/Piramide_Seta.png" alt="" width={143} height={93} />
                            <p className="text-black font-semibold text-4xl">{t("conexao.linha2parte2")}.</p>
                        </span>
                    </div>

                    <div className="flex flex-col gap-10 items-center justify-center mt-10">
                        <p className="text-primary text-base max-w-xl text-center">{t("conexao.descricao")}</p>
                    </div>
                </Container>
            </section>

            {/* Mobile */}
            <section className="mt-10 mb-20 block lg:hidden p-4">
                <Container>
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <span className="flex flex-col items-center gap-4 w-full md:w-[70%]">
                            <Image
                                src="/images/destaques/Mobile_Conexoes.png"
                                alt=""
                                width={500}
                                height={500}
                                className="w-full h-auto"
                            />
                            <p className="text-black font-semibold text-2xl text-center mt-4">
                                {t("conexao.fulltext")}
                            </p>
                        </span>

                    </div>

                    <div className="flex flex-col gap-10 items-center justify-center mt-10">
                        <p className="text-primary text-base max-w-xs md:max-w-md text-center">
                            {t("conexao.descricao")}
                        </p>
                    </div>
                </Container>
            </section>
        </>
    );
}