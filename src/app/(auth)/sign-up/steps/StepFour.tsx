"use client";

import { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { useTranslations } from "next-intl";

interface StepFourProps {
    onNext: (phone: string) => void;
    onBack: () => void;
}

export default function StepFour({ onNext, onBack }: StepFourProps) {
    const t = useTranslations("SignUp.step4");

    const [phone, setPhone] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handlePhoneChange = (value: string) => {
        const digitsOnly = value.replace(/\D/g, "");

        let formatted = "";
        if (digitsOnly.length <= 10) {
            formatted = digitsOnly.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        } else {
            formatted = digitsOnly.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        }

        setPhone(formatted.trim());
    };

    const handleSubmit = () => {
        const digits = phone.replace(/\D/g, "");

        if (digits.length < 10) {
            setError("Por favor, preencha um número de telefone válido.");
            return;
        }

        setError(null);
        onNext(digits);
    };

    const isDisabled = phone.replace(/\D/g, "").length < 10;

    return (
        <div className="flex flex-col min-h-[450px] sm:min-h-[700px] w-full max-w-sm px-4 sm:px-6 lg:px-0 mx-auto">
            <div className="hidden lg:block h-[72px]" />

            <div className="flex-1 flex items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="w-full space-y-5">
                        <div className="flex flex-col space-y-2 text-center sm:text-left">
                            <h1 className="text-xl font-semibold text-black">{t("title")}</h1>
                            <p className="text-base text-primary">{t("description")}</p>
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="phone" className="block text-base font-medium text-black mb-1">
                                {t("label")}
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder={t("placeholder.phone")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                value={phone}
                                onChange={(e) => handlePhoneChange(e.target.value)}
                                autoComplete="tel"
                            />
                            {error && <p className="text-sm text-red-600">{error}</p>}

                            <div className="flex justify-start pt-2 gap-4">
                                <CustomButton
                                    text={t("back")}
                                    onClick={onBack}
                                    variant="outline"
                                />
                                <CustomButton
                                    text={t("buttonNext")}
                                    onClick={handleSubmit}
                                    disabled={isDisabled}
                                    className={isDisabled ? "bg-[#E2DFE7] text-white" : ""}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}