"use client";

import Container from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";

export default function BannerClient(/* { initialRate }: { initialRate?: any } */) {
    const t = useTranslations("Home.banner");
    const [sendCurrency, setSendCurrency] = useState("BRL");
    const [receiveCurrency, setReceiveCurrency] = useState("MXN");

    const flags: Record<string, string> = {
        BRL: "/images/flags/flagbrazilbanner.png",
        MXN: "/images/flags/flagmexicobanner.png",
    };

    const currencies = [
        { code: "BRL", name: "Real Brasileiro" },
        { code: "MXN", name: "Peso Mexicano" },
    ];

    const handleSendChange = (selected: string) => {
        setSendCurrency(selected);
        if (selected === receiveCurrency) {
            const alt = currencies.find(c => c.code !== selected);
            setReceiveCurrency(alt?.code || "");
        }
    };

    const handleReceiveChange = (selected: string) => {
        setReceiveCurrency(selected);
        if (selected === sendCurrency) {
            const alt = currencies.find(c => c.code !== selected);
            setSendCurrency(alt?.code || "");
        }
    };

    return (
        <section
            className="bg-secondary text-white py-12 px-4 sm:px-6 mt-[110px] min-h-[476px]"
            style={{ backgroundImage: "url(/images/banner/background_header.png)" }}
        >
            <Container>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 md:mt-0 lg:mt-10">
                    {/* Texto */}
                    <div className="flex flex-col gap-4">
                        <div className="text-2xl sm:text-3xl font-semibold">
                            <span>{t("title1")}</span><br />
                            <span>{t("title2")}</span>
                        </div>
                        <p className="font-normal max-w-md">
                            {t("descriptionLine1")} <br className="hidden sm:block" /> {t("descriptionLine2")}
                        </p>
                    </div>

                    {/* Simulação */}
                    <div className="w-full max-w-lg space-y-4">
                        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center md:text-left text-white">
                            {t("simulateTitle")}
                        </h3>

                        {/* Campo 1 - Envio */}
                        <div className="flex items-center justify-between rounded-full bg-white px-4 py-2">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <p className="font-medium text-sm text-primary">{t("youSend")}</p>
                                    <input
                                        placeholder="0.00"
                                        className="bg-transparent text-black placeholder-black outline-none w-24 sm:w-32"
                                    />
                                </div>

                                <div className="flex items-center gap-2 ml-4 relative">
                                    <Image src={flags[sendCurrency]} alt={sendCurrency} width={32} height={32} />
                                    <select
                                        value={sendCurrency}
                                        onChange={(e) => handleSendChange(e.target.value)}
                                        className="text-black font-semibold bg-transparent outline-none appearance-none pl-2 pr-6 w-20"
                                    >
                                        {currencies.map((c) => (
                                            <option key={c.code} value={c.code}>{c.code}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2">
                                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Campo 2 - Recebimento */}
                        <div className="flex items-center justify-between rounded-full bg-white px-4 py-2">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <p className="font-medium text-sm text-primary">{t("beneficiaryReceives")}</p>
                                    <input
                                        placeholder="0.00"
                                        className="bg-transparent text-black placeholder-black outline-none w-24 sm:w-32"
                                    />
                                </div>

                                <div className="flex items-center gap-2 ml-4 relative">
                                    <Image src={flags[receiveCurrency]} alt={receiveCurrency} width={32} height={32} />
                                    <select
                                        value={receiveCurrency}
                                        onChange={(e) => handleReceiveChange(e.target.value)}
                                        className="text-black font-semibold bg-transparent outline-none appearance-none pl-2 pr-6 w-20"
                                    >
                                        {currencies.map((c) => (
                                            <option key={c.code} value={c.code}>{c.code}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2">
                                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info de câmbio*/}
                        <div className="flex sm:flex-row justify-between items-center gap-2 text-sm px-6">
                            <span className="flex items-center gap-1">
                                <Image src="/images/vetores/money.png" alt="dinheiro" width={20} height={20} />
                                <p className="text-white text-xs">
                                    {t("exchangeRate")} <strong>R$ 5,67</strong>
                                </p>
                            </span>
                            <div className="flex items-center gap-1">
                                <a href="#" className="text-white text-xs">{t("details")}</a>
                                <Image src="/images/vetores/arrow-right.png" alt="seta" width={20} height={20} />
                            </div>
                        </div>

                        <button className="w-full bg-btnsecondary hover:bg-teal-900 text-white rounded-full py-2 font-medium transition-colors">
                            {t("sendMoney")}
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}