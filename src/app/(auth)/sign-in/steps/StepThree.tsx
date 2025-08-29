"use client";

import CustomButton from "@/components/ui/CustomButton";
import { useTranslations } from "next-intl";

export default function StepThree() {
    const t = useTranslations("SignIn.step3");

    return (
        <div className="flex flex-col justify-between h-[80svh] sm:min-h-[700px] w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto pt-4">
            {/* espaçamento só no desktop */}
            <div className="hidden lg:block h-[72px]" />

            {/* Conteúdo */}
            <div className="flex sm:flex-1 items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="sm:w-sm w-full space-y-5 mt-0 sm:mt-[-25px]">
                        {/* voltar + título */}
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/vetores/arrow-left.png"
                                alt={t("back")}
                                className="w-6 h-6"
                            />
                            <a href="/sign-in" className="text-primary text-xs">
                                {t("back")}
                            </a>
                        </div>

                        <h1 className="text-xl font-semibold text-black break-words w-xs">
                            {t("title")}
                        </h1>

                        <form className="space-y-4 ">
                            <input
                                type="text"
                                placeholder={t("acessCode")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />

                            {/* Ações (desktop) */}
                            <div className="hidden sm:flex w-full justify-between items-center mt-4">
                                <CustomButton text={t("button_confirm")} onClick={() => { }} />
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/images/icones/resent-code.png"
                                        alt={t("resentCode")}
                                        className="w-6 h-6"
                                    />
                                    <button
                                        type="button"
                                        className="text-secondary underline underline-offset-1 text-xs"
                                        onClick={() => { }}
                                    >
                                        {t("resentCode")}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Ações (mobile) */}
            <div className="block sm:hidden w-full">
                <CustomButton
                    text={t("button_confirm")}
                    className="mt-4 w-full"
                    onClick={() => { }}
                />
                <div className="flex items-center justify-center gap-2 mt-4">
                    <img
                        src="/images/icones/resent-code.png"
                        alt={t("resentCode")}
                        className="w-5 h-5"
                    />
                    <button
                        type="button"
                        className="text-secondary underline underline-offset-1 text-xs"
                        onClick={() => { }}
                    >
                        {t("resentCode")}
                    </button>
                </div>
            </div>
        </div>
    );
}