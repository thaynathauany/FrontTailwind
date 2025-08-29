"use client";

import { useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";

export default function SignUpWizard() {
    const [step, setStep] = useState(1);

    return (
        <div className="flex flex-1 items-start justify-center px-4 pb-6 sm:px-6 sm:pb-8 mt-4 sm:mt-0">
            {step === 1 && <StepOne onNext={() => setStep(2)} />}
            {step === 2 && <StepTwo onNext={() => setStep(3)} />}
            {step === 3 && <StepThree />}
        </div>
    );
}