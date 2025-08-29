"use client";
import { useState, useEffect } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";

export default function SignUpWizard() {
    const [step, setStep] = useState(1);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className="flex flex-1 items-start justify-center px-4 pb-6 sm:px-6 sm:pb-8 mt-4 sm:mt-0">
            {step === 1 && <StepOne onNext={() => setStep(2)} />}
            {step === 2 && <StepTwo onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <StepThree />}
        </div>
    );
}