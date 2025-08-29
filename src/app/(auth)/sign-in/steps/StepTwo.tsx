"use client";

import CustomButton from "@/components/ui/CustomButton";
import { useTranslations } from "next-intl";

interface StepTwoProps {
    onNext: () => void;
}

export default function StepTwo({ onNext }: StepTwoProps) {
    const t = useTranslations("SignIn.step2");

    return (
        <div className="flex flex-col justify-between h-[80svh] sm:min-h-[700px] w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto pt-4">
            <div className="hidden lg:block h-[72px]" />

            <div className="flex sm:flex-1 items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="sm:w-sm w-full space-y-5">
                        <div className="flex flex-col space-y-2 text-start sm:text-left">
                            <h1 className="text-xl font-semibold text-black">{t("title")}</h1>
                            <p className="text-base text-primary">{t("description")}</p>
                        </div>

                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder={t("email")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />

                            <div className="hidden sm:block">
                                <CustomButton
                                    text={t("button_continue")}
                                    className="mt-4"
                                    onClick={onNext}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block pb-8 sm:pb-6">
                <p className="text-center text-sm text-primary mt-10 sm:mt-0">
                    {t("noAccount")}{" "}
                    <a
                        href="/sign-in"
                        className="text-secondary underline underline-offset-1 font-medium"
                    >
                        {t("createAccount")}
                    </a>
                </p>
            </div>

            <div className="block sm:hidden w-full">
                <CustomButton
                    text={t("button_continue")}
                    className="mt-4 w-full"
                    onClick={onNext}
                />
                <p className="text-center text-sm text-primary mt-4">
                    {t("noAccount")}{" "}
                    <a
                        href="/sign-in"
                        className="text-secondary underline underline-offset-1 font-medium"
                    >
                        {t("createAccount")}
                    </a>
                </p>
            </div>
        </div>
    );
}