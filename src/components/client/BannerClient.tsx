"use client";

import Container from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fmtCurrency, fmtMoneyNoSymbol, parseMoneyInput } from "@/utils/format";
import { Currency, Quote } from "@/features/exchange/types";
import { fetchQuote } from "@/features/exchange/services/client";

export default function BannerClient() {
    const t = useTranslations("Home.banner");

    const [sendCurrency, setSendCurrency] = useState<Currency>("BRL");
    const [receiveCurrency, setReceiveCurrency] = useState<Currency>("MXN");
    const [sendInput, setSendInput] = useState<string>("100,00");
    const [sendAmountNum, setSendAmountNum] = useState<number>(100);

    const [committedAmount, setCommittedAmount] = useState<number>(100);
    const typingTimeoutRef = useRef<number | null>(null);

    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const isTooLow = !!quote && quote.breakdown.baseAfterFees <= 0;
    const minRequired = isTooLow
        ? +(quote!.fees.fixed / (1 - quote!.fees.percent)).toFixed(2)
        : null;

    useEffect(() => {
        setSendInput((prev) => {
            const num = parseMoneyInput(prev, sendCurrency);
            return fmtMoneyNoSymbol(num, sendCurrency);
        });
    }, [sendCurrency]);

    const flags: Record<Currency, string> = {
        BRL: "/images/flags/flagbrazilbanner.png",
        MXN: "/images/flags/flagmexicobanner.png",
    };

    const handleSendChange = (selected: Currency) => {
        setSendCurrency(selected);
        if (selected === receiveCurrency) setReceiveCurrency(selected === "BRL" ? "MXN" : "BRL");
    };
    const handleReceiveChange = (selected: Currency) => {
        setReceiveCurrency(selected);
        if (selected === sendCurrency) setSendCurrency(selected === "BRL" ? "MXN" : "BRL");
    };

    useEffect(() => {
        const amount = committedAmount;
        if (!amount || amount <= 0 || sendCurrency === receiveCurrency) {
            setQuote(null);
            return;
        }

        if (abortRef.current) abortRef.current.abort();
        const ac = new AbortController();
        abortRef.current = ac;

        (async () => {
            try {
                setLoading(true);
                const q = await fetchQuote(
                    { sendAmount: amount, from: sendCurrency, to: receiveCurrency },
                    ac.signal
                );
                setQuote(q);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    console.error(err);
                    setQuote(null);
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => ac.abort();
    }, [committedAmount, sendCurrency, receiveCurrency]);

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                window.clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

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
                                        inputMode="decimal"
                                        pattern="[0-9.,]*"
                                        placeholder={sendCurrency === "BRL" ? "0,00" : "0.00"}
                                        value={sendInput}
                                        onChange={(e) => {
                                            const raw = e.target.value;
                                            setSendInput(raw);
                                            const parsed = parseMoneyInput(raw, sendCurrency);
                                            setSendAmountNum(parsed);
                                            if (typingTimeoutRef.current) {
                                                window.clearTimeout(typingTimeoutRef.current);
                                            }
                                            typingTimeoutRef.current = window.setTimeout(() => {
                                                setCommittedAmount(parsed);
                                            }, 800);
                                        }}
                                        onBlur={() => {
                                            const n = parseMoneyInput(sendInput, sendCurrency);
                                            setSendInput(fmtMoneyNoSymbol(n, sendCurrency));
                                            if (typingTimeoutRef.current) {
                                                window.clearTimeout(typingTimeoutRef.current);
                                                typingTimeoutRef.current = null;
                                            }
                                            setCommittedAmount(n);
                                        }}
                                        className="bg-transparent text-black placeholder-black outline-none w-24 sm:w-32"
                                    />
                                </div>

                                <div className="flex items-center gap-2 ml-4 relative">
                                    <Image src={flags[sendCurrency]} alt={sendCurrency} width={32} height={32} />
                                    <select
                                        value={sendCurrency}
                                        onChange={(e) => handleSendChange(e.target.value as Currency)}
                                        className="text-black font-semibold bg-transparent outline-none appearance-none pl-2 pr-6 w-20"
                                    >
                                        <option value="BRL">BRL</option>
                                        <option value="MXN">MXN</option>
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
                                        value={
                                            quote
                                                ? fmtCurrency(Math.max(0, quote.breakdown.receiveAmount), receiveCurrency)
                                                : ""
                                        }
                                        readOnly
                                        className="bg-transparent text-black placeholder-black outline-none w-24 sm:w-32"
                                    />
                                </div>

                                <div className="flex items-center gap-2 ml-4 relative">
                                    <Image src={flags[receiveCurrency]} alt={receiveCurrency} width={32} height={32} />
                                    <select
                                        value={receiveCurrency}
                                        onChange={(e) => handleReceiveChange(e.target.value as Currency)}
                                        className="text-black font-semibold bg-transparent outline-none appearance-none pl-2 pr-6 w-20"
                                    >
                                        <option value="BRL">BRL</option>
                                        <option value="MXN">MXN</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2">
                                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isTooLow && minRequired !== null && (
                            <div className="flex flex-col items-center">
                                <p className="text-red-500 text-xs px-2 py-1 mt-1 bg-white rounded w-fit">
                                    Valor muito baixo para cobrir as taxas. Mínimo aproximado: {fmtMoneyNoSymbol(minRequired, sendCurrency)} {sendCurrency}
                                </p>
                            </div>

                        )}

                        {/* Info de câmbio */}
                        <div className="flex flex-col gap-2 text-sm px-6">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                    <Image src="/images/vetores/money.png" alt="dinheiro" width={20} height={20} />
                                    <p className="text-white text-xs">
                                        {t("exchangeRate")}{" "}
                                        <strong>
                                            {quote
                                                ? `1 ${sendCurrency} = ${quote.rate} ${receiveCurrency}`
                                                : loading ? t("loading") : "—"}
                                        </strong>
                                    </p>
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setShowDetails(!showDetails)}
                                    className="flex items-center gap-1 text-white text-xs"
                                >
                                    {t("details")}
                                    <Image
                                        src="/images/vetores/arrow-right.png"
                                        alt="seta"
                                        width={20}
                                        height={20}
                                        className={`transform transition-transform ${showDetails ? "rotate-90" : ""}`}
                                    />
                                </button>
                            </div>

                            {/* Acordeão */}
                            {showDetails && quote && (
                                <div className="bg-white/10 rounded-md p-3 text-xs text-white space-y-1">
                                    <div className="flex justify-between">
                                        <span>{t("fees.fixed")}</span>
                                        <span>{quote.fees.fixed.toFixed(2)} {sendCurrency}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t("fees.percent")}</span>
                                        <span>{(quote.fees.percent * 100).toFixed(2)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t("fees.total")}</span>
                                        <span>{quote.fees.total.toFixed(2)} {sendCurrency}</span>
                                    </div>
                                    <hr className="border-white/20" />
                                    <div className="flex justify-between font-medium">
                                        <span>{t("fees.totalAfterFees")}</span>
                                        <span>{quote.breakdown.baseAfterFees.toFixed(2)} {sendCurrency}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            className="w-full bg-btnsecondary hover:bg-teal-900 text-white rounded-full py-2 font-medium transition-colors disabled:opacity-60"
                            disabled={!quote || loading || isTooLow}
                            onClick={() => {
                            }}
                        >
                            {t("sendMoney")}
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}