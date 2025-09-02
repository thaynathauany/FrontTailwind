"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CustomButton from "@/components/ui/CustomButton";

interface StepOneProps {
    onNext: (name: string) => void;
}

export default function StepOne({ onNext }: StepOneProps) {
    const t = useTranslations("SignUp.step1");

    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const trimmedName = name.trim();
    const words = trimmedName.split(/\s+/);
    const isValidName = trimmedName.length >= 6 && words.length >= 2;

    const handleNext = () => {
        if (!isValidName) {
            if (!trimmedName) {
                setError("Por favor, preencha seu nome completo.");
            } else if (trimmedName.length < 6) {
                setError("O nome deve ter no mínimo 6 caracteres.");
            } else {
                setError("Por favor, informe nome e sobrenome.");
            }
            return;
        }

        setError(null);
        onNext(trimmedName);
    };

    return (
        <div className="flex flex-col justify-between h-[80svh] sm:min-h-[700px] w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto pt-4">
            <div className="hidden lg:block h-[72px]" />

            <div className="flex-1 flex items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="sm:w-sm w-full space-y-5">
                        <div className="flex flex-col space-y-2 text-left">
                            <h1 className="text-xl font-semibold text-black break-normal">
                                {t("title")}
                            </h1>
                            <p className="text-base text-primary break-normal">
                                {t("description")}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="name" className="block text-base font-medium text-black mb-1">
                                {t("label")}
                            </label>
                            <input
                                type="text"
                                placeholder={t("placeholder.name")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                            />
                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}

                            <CustomButton
                                text={t("buttonNext")}
                                className={`mt-4 ${!isValidName ? "bg-[#E2DFE7] text-white" : ""}`}
                                onClick={handleNext}
                                disabled={!isValidName}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-0 sm:pb-6">
                <p className="text-center text-sm text-primary break-normal">
                    {t("footerText")}{" "}
                    <a href="/sign-in" className="text-black font-medium">
                        {t("footerLink")}
                    </a>
                </p>
            </div>
        </div>
    );
}