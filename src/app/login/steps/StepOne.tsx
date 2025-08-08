"use client";

import CustomButton from "@/components/ui/CustomButton";
import { useTranslations } from "next-intl";

interface StepOneProps {
    onNext: () => void;
}

export default function StepOne({ onNext }: StepOneProps) {
    const t = useTranslations("SignIn.step1");

    return (
        <div className="flex flex-col min-h-0 sm:min-h-[700px] w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto">
            <div className="hidden lg:block h-[72px]" />

            {/* sem flex-1 no mobile */}
            <div className="flex sm:flex-1 items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="w-full space-y-5">
                        <div className="flex flex-col space-y-2 text-center sm:text-left">
                            <h1 className="text-xl font-semibold text-black">{t("title")}</h1>
                            <p className="text-base text-primary">{t("description")}</p>
                        </div>

                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder={t("emailOrPhone")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <CustomButton text={t("button_continue")} className="mt-4" onClick={onNext} />
                        </form>
                    </div>
                </div>
            </div>
            <div className="pb-8 sm:pb-6">
                <p className="text-center text-sm text-primary mt-10 sm:mt-0">
                    {t("noAccount")}{" "}
                    <a
                        href="/login"
                        className="text-secondary underline underline-offset-1 font-medium"
                    >
                        {t("createAccount")}
                    </a>
                </p>
            </div>
        </div>
    );
}