"use client";

import { useTranslations } from "next-intl";
import CustomButton from "@/components/ui/CustomButton";

export default function StepSeven() {
    const t = useTranslations("SignUp.step7");

    return (
        <div className="flex flex-col min-h-fit sm:min-h-[700px] w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto">
            <div className="hidden lg:block h-[72px]" />

            <div className="flex-1 flex items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="w-full space-y-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-secondary">
                            <span className="text-secondary text-lg">✓</span>
                        </div>

                        <div className="max-w-sm space-y-2 text-left">
                            <h1 className="text-xl font-semibold text-black">{t("title")}</h1>
                            <p className="text-base text-primary">
                                {t("description")}
                            </p>
                        </div>

                        <CustomButton
                            text={t("loginButton")}
                            onClick={() => window.location.href = "/sign-in"}
                        />
                    </div>
                </div>
            </div>

            <div className="pb-8 sm:pb-6 mt-10">
                <p className="text-center text-sm text-primary">
                    {t("support_prefix")}{" "}
                    <a href="/contato" className="text-black font-medium">
                        {t("support_link")}
                    </a>
                </p>
            </div>
        </div>
    );
}