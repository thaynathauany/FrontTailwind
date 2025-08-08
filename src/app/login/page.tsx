"use client";

import { useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import Container from "@/components/ui/Container";
import AuthHeader from "@/components/layout/AuthHeader.tsx/page";
import { useTranslations } from "next-intl";


export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const t = useTranslations("SignIn");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Lado esquerdo */}
      <div className="flex flex-col justify-start px-4 pb-6 sm:px-6 sm:pb-8 bg-secondary text-white w-full lg:w-1/2">
        <AuthHeader />
        <div className="flex items-center justify-center px-0 py-0 sm:px-6 lg:flex-1">
          <Container className="p-0">
            <img
              src="/images/destaques/Mobile_Banner_Cafe.png"
              alt="Cafezinho"
              className="w-full max-w-[300px] h-auto rounded-md mb-6 mx-auto lg:mx-0"
            />
            <div className="flex flex-col space-y-2 text-center lg:text-left w-full max-w-xs mx-auto lg:mx-0">
              <h2 className="text-xl font-bold">
                {t("signinBannerTitle")}
              </h2>
              <p className="text-base">
                {t("signinBannerDescription")}
              </p>
            </div>
          </Container>
        </div>
      </div>

      {/* Lado direito */}
      <div className="flex flex-col w-full lg:w-1/2">
        <div className="flex flex-1 items-start justify-center px-4 pb-6 mt-8 sm:px-6 sm:pb-8 sm:mt-0">
          {step === 1 && <StepOne onNext={() => setStep(2)} />}
          {step === 2 && <StepTwo onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <StepThree />}
        </div>
      </div>
    </div>
  );
}