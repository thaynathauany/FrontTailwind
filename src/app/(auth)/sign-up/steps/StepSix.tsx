"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CustomButton from "@/components/ui/CustomButton";

interface StepSixProps {
    onNext: () => void;
    onBack: () => void;
}

export default function StepSix({ onNext, onBack }: StepSixProps) {
    const t = useTranslations("SignUp.step6");
    const [loading, setLoading] = useState(false);

    const handleVerify = () => {
        setLoading(true);

        // 🔜 Aqui no futuro vamos integrar com a SDK/API da IdWall
        setTimeout(() => {
            setLoading(false);
            onNext();
        }, 1000);
    };

    return (
        <div className="flex flex-col min-h-[450px] sm:min-h-[700px] w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto">
            <div className="hidden lg:block h-[72px]" />

            <div className="flex-1 flex items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="w-full space-y-5 text-center sm:text-left">
                        <h1 className="text-xl font-semibold text-black">IDWALL</h1>
                        <p className="text-base text-primary"></p>
                        <div className="flex justify-center sm:justify-start gap-4 pt-4">
                            <CustomButton
                                text={t("back")}
                                onClick={onBack}
                                variant="outline"
                            />
                            <CustomButton
                                text={loading ? t("loading") : t("buttonNext")}
                                onClick={handleVerify}
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}