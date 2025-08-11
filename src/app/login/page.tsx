"use client";

import { useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import AuthHeader from "@/components/layout/AuthHeader.tsx/page";
import SignInBannerCarousel from "@/components/ui/AutoStepperCarousel";


export default function SignUpPage() {
  const [step, setStep] = useState(1);
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Lado esquerdo */}
      <div className="flex flex-col justify-start px-4 pb-6 sm:px-6 sm:pb-8 bg-secondary text-white w-full lg:w-1/2">
        <AuthHeader />
        <div className="flex items-center justify-center px-0 py-0 sm:px-6 lg:flex-1">
          <SignInBannerCarousel
            slides={[
              {
                id: "cafe",
                image: "/images/destaques/Mobile_Banner_Cafe.png",
                alt: "Cafezinho",
              },
              {
                id: "emergency",
                image: "/images/destaques/Mobile_Sobre_Banner_01.png",
                alt: "Emergência",
              },
            ]}
            ns="Carousel"
            intervalMs={6000}
          />
        </div>
      </div>

      {/* Lado direito */}
      <div className="flex flex-col w-full lg:w-1/2">
        <div className="flex flex-1 items-start justify-center px-4 pb-6 mt-8 sm:px-6 sm:pb-8 sm:mt-0">
          {step === 1 && <StepOne onNext={() => setStep(2)} />}
          {step === 2 && <StepTwo onNext={() => setStep(3)} />}
          {step === 3 && <StepThree />}
        </div>
      </div>
    </div>
  );
}