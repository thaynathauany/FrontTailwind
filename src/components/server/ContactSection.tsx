import Container from "@/components/ui/Container";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ContactForm from "../client/ContactForm";

export default async function ContactSection() {
    const t = await getTranslations("Contact");

    return (
        <section className="w-full py-10 px-4 pt-30 md:pt-[150px] flex items-center">
            <Container>
                <h2 className="text-secondary text-2xl md:text-4xl font-semibold text-center mb-12">
                    {t("title")}
                </h2>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-y-8 md:gap-x-20">
                    {/* Lado esquerdo */}
                    <div className="flex-1 max-w-[320px] space-y-6">
                        <div className="flex items-start gap-4">
                            <Image src="/images/icones/mail.png" alt="Email" width={24} height={24} className="mt-1" />
                            <div>
                                <p className="font-bold text-primary">{t("emailLabel")}</p>
                                <p className="text-primary">dinerolatam@dinerolatam.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Image src="/images/icones/phone.png" alt="Telefone" width={24} height={24} className="mt-1" />
                            <div>
                                <p className="font-bold text-primary">{t("phoneLabel")}</p>
                                <p className="text-primary">+52 12 3456-7890</p>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/521234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mx-auto md:mx-0 text-center w-fit bg-secondary text-white px-6 py-2 rounded-full font-medium mt-4"
                        >
                            {t("whatsappButton")}
                        </a>
                    </div>

                    {/* Lado direito - formulário */}
                    <div className="flex-1 max-w-[480px] w-full">
                        <ContactForm
                            placeholders={{
                                name: t("placeholder.name"),
                                email: t("placeholder.email"),
                                subject: t("placeholder.subject"),
                                message: t("placeholder.message"),
                            }}
                            submitLabel={t("submitButton")}
                            successMsg={t("success")}
                            errorMsg={t("error")}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}