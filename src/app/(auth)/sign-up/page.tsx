import SignInBannerCarousel from "@/components/server/AutoStepperCarousel";
import SignUpWizard from "./SignUpWizard";
import AuthHeader from "@/components/layout/AuthHeader.tsx/page";

export default function Page() {
    return (
        <div className="flex flex-col lg:flex-row min-h-[100svh]">
            {/* Lado esquerdo */}
            <div className="flex flex-col justify-start px-4 bg-secondary text-white w-full lg:w-1/2">
                <AuthHeader />
                <div className="hidden lg:flex items-center justify-center px-0 py-0 lg:px-6 lg:flex-1">
                    <SignInBannerCarousel
                        slides={[
                            { id: "cafe", image: "/images/destaques/Mobile_Banner_Cafe.png", alt: "Cafezinho" },
                            { id: "emergency", image: "/images/destaques/Mobile_Banner_Cafe.png", alt: "Emergência" },
                        ]}
                        ns="Carousel"
                        intervalMs={6000}
                    />
                </div>
            </div>

            {/* Lado direito */}
            <div className="flex flex-col w-full lg:w-1/2 flex-1">
                <SignUpWizard />
            </div>
        </div>
    );
}