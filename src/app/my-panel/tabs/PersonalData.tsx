"use client";

import { useRef, useState, ChangeEvent } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { useTranslations } from "next-intl";

export default function PersonalData() {
    const t = useTranslations("MyPanel.personalData");

    // refs para abrir o file picker
    const idInputRef = useRef<HTMLInputElement | null>(null);
    const addressInputRef = useRef<HTMLInputElement | null>(null);

    const [idFileName, setIdFileName] = useState<string>("");
    const [addressFileName, setAddressFileName] = useState<string>("");

    const handlePickId = () => idInputRef.current?.click();
    const handlePickAddress = () => addressInputRef.current?.click();

    const handleFileChange = (
        e: ChangeEvent<HTMLInputElement>,
        setName: (v: string) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setName(file.name);
            // TODO: envie o arquivo para a API aqui
            // ex: await Api.upload("/documents", file)
            // depois zere o input se quiser permitir mesmo nome novamente:
            // e.target.value = "";
        }
    };

    return (
        <div className="flex flex-col w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto">
            <div className="flex-1 flex items-start sm:items-center justify-center">
                <div className="flex flex-col items-start justify-start w-sm">
                    <div className="w-full space-y-5">
                        <div className="flex flex-col space-y-2 text-center sm:text-left">
                            <h1 className="text-2xl font-semibold text-black">{t("title")}</h1>
                        </div>

                        {/* Formulário de dados pessoais */}
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder={t("name")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="email"
                                placeholder={t("email")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="tel"
                                placeholder={t("phone")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <CustomButton text={t("saveChanges")} disabled onClick={() => { }} />

                        </form>

                        {/* Seção: Documentos */}
                        <section className="pt-6">
                            <h2 className="text-2xl font-semibold text-black">{t("documents")}</h2>

                            {/* Documento de identidade */}
                            <div className="mt-4">
                                <p className="text-primary">{t("identityDocument")}</p>
                                <button
                                    type="button"
                                    onClick={handlePickId}
                                    className="text-secondary underline underline-offset-2 cursor-pointer"
                                >
                                    {t("updateDocument")}
                                </button>
                                {idFileName && (
                                    <p className="text-xs text-primary mt-1">{t("addressProof")} {idFileName}</p>
                                )}
                                <input
                                    ref={idInputRef}
                                    type="file"
                                    accept="image/*,.pdf"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, setIdFileName)}
                                />
                            </div>

                            {/* Comprovante de endereço */}
                            <div className="mt-6">
                                <p className="text-primary">{t("addressProof")}</p>
                                <button
                                    type="button"
                                    onClick={handlePickAddress}
                                    className="text-secondary underline underline-offset-2 cursor-pointer"
                                >
                                    {t("updateDocument")}
                                </button>
                                {addressFileName && (
                                    <p className="text-xs text-primary mt-1">{t("updateDocument")} {addressFileName}</p>
                                )}
                                <input
                                    ref={addressInputRef}
                                    type="file"
                                    accept="image/*,.pdf"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, setAddressFileName)}
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}