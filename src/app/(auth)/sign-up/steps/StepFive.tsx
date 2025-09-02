"use client";

import { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { useTranslations } from "next-intl";

interface StepFiveProps {
    onBack: () => void;
    onVerify: (code: string) => void;
}

export default function StepFive({ onBack, onVerify }: StepFiveProps) {
    const t = useTranslations("SignUp.step5");
    const [code, setCode] = useState(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(30);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const isComplete = code.every((digit) => digit.length === 1);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        if (isComplete) {
            onVerify(code.join(""));
        }
    };

    return (
        <div className="flex flex-col min-h-[450px] sm:min-h-[700px] w-full max-w-sm px-4 sm:px-6 lg:px-0 mx-auto">
            <div className="hidden lg:block h-[72px]" />

            <div className="flex-1 flex items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="w-full space-y-6">
                        <div className="flex flex-col space-y-2 text-center sm:text-left">
                            <h1 className="text-xl font-semibold text-black">
                                {t("title")}
                            </h1>
                            <p className="text-base text-primary">
                                {t("description")}
                            </p>
                        </div>

                        {/* Inputs de código */}
                        <div className="flex justify-between">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => {
                                        inputsRef.current[index] = el;
                                    }}
                                    className={`w-12 h-12 text-center border rounded-md text-lg font-medium outline-none transition
                    ${digit
                                            ? "border-secondary"
                                            : "border-gray-300"}
                    focus:ring-2 focus:ring-secondary`}
                                />
                            ))}
                        </div>

                        {/* Botões */}
                        <div className="flex justify-start pt-2 gap-4">
                            <CustomButton
                                text="Voltar"
                                onClick={onBack}
                                variant="outline"
                            />
                            <CustomButton
                                text="Confirmar"
                                onClick={handleSubmit}
                                disabled={!isComplete}
                                className={`${!isComplete ? "bg-[#E2DFE7] text-white" : ""
                                    }`}
                            />
                        </div>

                        {/* Timer */}
                        <p className="text-sm text-primary text-center sm:text-left">
                            {t("button_resend")}{" "}
                            <span className="font-medium text-secondary">
                                {`00:${timeLeft.toString().padStart(2, "0")}`}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}