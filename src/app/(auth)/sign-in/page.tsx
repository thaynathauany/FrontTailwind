import SignBannerCarousel from "@/components/client/AutoStepperCarousel";
import SignUpWizard from "./SignUpWizard";
import AuthHeader from "@/components/layout/AuthHeader.tsx/page";

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row min-h-[100svh]">
      {/* Coluna esquerda */}
      <section className="flex flex-col justify-start px-4 bg-secondary text-white w-full lg:w-1/2">
        <AuthHeader />
        <div className="hidden lg:flex items-center justify-center px-0 py-0 lg:px-6 lg:flex-1">
          <SignBannerCarousel
            slides={[
              { id: "cafe", image: "/images/destaques/Carrossel_1.png", alt: "Cafezinho" },
              { id: "estudos", image: "/images/destaques/Carrossel_2.png", alt: "Estudos" },
              { id: "destino", image: "/images/destaques/Carrossel_3.png", alt: "Destino" },
            ]}
            ns="Carousel"
            intervalMs={6000}
          />
        </div>
      </section>

      {/* Coluna direita */}
      <section className="flex flex-col w-full lg:w-1/2 flex-1">
        <SignUpWizard />
      </section>
    </div>
  );
}