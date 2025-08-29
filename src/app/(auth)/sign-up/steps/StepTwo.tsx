"use client";

import { useTranslations } from "next-intl";
import CustomButton from "@/components/ui/CustomButton";

interface StepTwoProps {
    onNext: () => void;
    onBack: () => void;
}

export default function StepTwo({ onNext, onBack }: StepTwoProps) {
    const t = useTranslations("SignUp.step2");

    return (
        <div className="flex flex-col min-h-[450px] sm:min-h-[700px] w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto">
            <div className="hidden lg:block h-[72px]" />

            <div className="flex-1 flex items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="w-full space-y-5">
                        <div className="flex flex-col space-y-2 text-center sm:text-left">
                            <h1 className="text-xl font-semibold text-black">{t("title")}</h1>
                            <p className="text-base text-primary">{t("description")}</p>
                        </div>

                        <div className="w-[60px] px-4 py-2 border-t border-gray-300 " />

                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-base font-medium text-black mb-1">
                                    {t("documentTitle")}
                                </label>
                                <p className="text-base text-primary">{t("documentDescription")}</p>

                                <label htmlFor="file-id" className="cursor-pointer text-secondary underline text-sm">
                                    {t("selectFile")}
                                </label>
                                <input id="file-id" type="file" className="hidden" />
                            </div>

                            <div className="w-[60px] px-4 py-2 border-t border-gray-300 " />

                            <div className="space-y-2">
                                <label className="block text-base font-medium text-black mb-1">
                                    {t("addressTitle")}
                                </label>
                                <p className="text-base text-primary">{t("addressDescription")}</p>

                                <label htmlFor="file-id" className="cursor-pointer text-secondary underline text-sm">
                                    {t("selectFile")}
                                </label>
                                <input id="file-id" type="file" className="hidden" />
                            </div>

                            <div className="w-[60px] px-4 py-2 border-t border-gray-300 " />

                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="terms" />
                                <label htmlFor="terms" className="text-sm text-darkgray">
                                    {t("termsText")}
                                </label>
                            </div>

                            <div className="flex justify-between pt-2">
                                <button
                                    type="button"
                                    onClick={onBack}
                                    className="text-sm text-secondary font-medium"
                                >
                                    {t("back")}
                                </button>

                                <CustomButton text={t("finish")} onClick={onNext} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}