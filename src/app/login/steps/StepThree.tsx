"use client";

import CustomButton from "@/components/ui/CustomButton";
import { useTranslations } from "next-intl";

interface StepOneProps {
    onNext: () => void;
}

export default function StepOne({ onNext }: StepOneProps) {
    const t = useTranslations("SignIn.step3");

    return (
        <div className="flex flex-col min-h-0 sm:min-h-[300px] w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto">
            <div className="hidden lg:block h-[72px]" />

            {/* sem flex-1 no mobile */}
            <div className="flex sm:flex-1 items-start sm:items-center justify-center pt-2 sm:pt-12 mt-6 sm:mt-0">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="w-full space-y-5">
                        <div className="flex flex-col space-y-2 text-center sm:text-left">
                            <div className="flex items-center space-x-2 mb-4">
                                <img
                                    src="/images/vetores/arrow-left.png"
                                    alt="Voltar"
                                    className="w-6 h-6"
                                />
                                <a href="/login" className="text-primary text-xs">
                                    {t("back")}
                                </a>
                            </div>
                            <h1 className="text-xl font-semibold text-black">{t("title")}</h1>
                        </div>

                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder={t("acessCode")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <div className="w-full flex justify-between items-center text-center sm:text-left mt-4">
                                <CustomButton text={t("button_confirm")} onClick={onNext} />
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="/images/icones/resent-code.png"
                                        alt="Reenviar código de acesso"
                                        className="w-6 h-6"
                                    />
                                    <a
                                        href="/login"
                                        className="text-secondary underline underline-offset-1 text-xs"
                                    >
                                        {t("resentCode")}
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}