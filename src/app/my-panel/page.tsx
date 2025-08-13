"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import History from "./tabs/History";
import PersonalData from "./tabs/PersonalData";
import Transference from "./tabs/Transference";

// SVGs
import Dinheiro from "@/assets/icones/Money.svg";
import DadosPessoais from "@/assets/icones/DadosPessoais.svg";
import Historico from "@/assets/icones/Historico.svg";

type SvgComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function MyPanelPage() {
    const searchParams = useSearchParams();
    const initialTab = Number(searchParams.get("tab")) as 1 | 2 | 3 | 4 || 2;

    const [step, setStep] = useState<1 | 2 | 3 | 4>(initialTab);

    useEffect(() => {
        const tab = Number(searchParams.get("tab")) as 1 | 2 | 3 | 4;
        if (tab) setStep(tab);
    }, [searchParams]);

    const tabs: { step: 1 | 2 | 3 | 4; label: string; icon: SvgComp }[] = [
        { step: 1, label: "Nova transferência", icon: Dinheiro },
        { step: 2, label: "Dados pessoais", icon: DadosPessoais },
        { step: 3, label: "Histórico", icon: Historico },
    ];

    return (
        <div className="bg-white mt-[120px]">
            <div className="w-full bg-[#f9f9f9] border-t border-gray-200">
                <nav
                    className="mx-auto max-w-5xl flex overflow-x-auto px-4 sm:px-6 py-2 whitespace-nowrap gap-3 sm:gap-4 justify-start sm:justify-center scrollbar-none snap-x snap-mandatory"
                    style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
                >
                    {tabs.map(({ step: s, label, icon: Icon }) => {
                        const active = step === s;
                        return (
                            <button
                                key={s}
                                onClick={() => setStep(s)}
                                className={`relative inline-flex shrink-0 items-center gap-2 px-3 sm:px-4 py-3 text-sm font-base ${active ? "text-secondary" : "text-primary"} snap-start`}
                                aria-current={active ? "page" : undefined}
                            >
                                <Icon
                                    className={`h-6 w-6 overflow-visible ${active ? "text-secondary" : "text-black"} [&_*]:stroke-current [&_*]:fill-none`}
                                    aria-hidden
                                />
                                <span className="shrink-0">{label}</span>

                                {active && (
                                    <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-secondary rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
                {step === 1 && <Transference />}
                {step === 2 && <PersonalData />}
                {step === 3 && <History />}
            </main>
        </div>
    );
}