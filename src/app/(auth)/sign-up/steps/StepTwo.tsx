"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";

interface StepTwoProps {
    onNext: (email: string) => void;
    onBack: () => void;
}

export default function StepTwo({ onNext, onBack }: StepTwoProps) {
    const t = useTranslations("SignUp.step2");

    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const trimmedEmail = email.trim();
    const isValidEmail = validateEmail(trimmedEmail);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault?.();
        if (!trimmedEmail) {
            setError("Por favor, preencha seu email.");
            return;
        }
        if (!isValidEmail) {
            setError("Formato de email inválido.");
            return;
        }

        setError(null);
        onNext(trimmedEmail);
    };

    return (
        <div className="flex flex-col min-h-[450px] sm:min-h-[700px] max-w-sm w-full px-4 sm:px-6 lg:px-0 mx-auto">
            <div className="hidden lg:block h-[72px]" />

            <div className="flex-1 flex items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="w-full space-y-5">
                        <div className="flex flex-col space-y-2 text-center sm:text-left">
                            <h1 className="text-xl font-semibold text-black">{t("title")}</h1>
                            <p className="text-base text-primary">{t("description")}</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-base font-medium text-black mb-1">
                                    {t("label")}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder={t("placeholder.email")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                                {error && (
                                    <p className="text-sm text-red-600">{error}</p>
                                )}
                            </div>

                            <div className="flex justify-start pt-2 gap-4">
                                <CustomButton
                                    text={t("back")}
                                    onClick={onBack}
                                    variant="outline"
                                />
                                <CustomButton
                                    text={t("buttonNext")}
                                    onClick={handleSubmit}
                                    disabled={!isValidEmail}
                                    className={`${!isValidEmail ? "bg-[#E2DFE7] text-white" : ""}`}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}