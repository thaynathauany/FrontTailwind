"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { fmtBRL, fmtCurrency, fmtMoneyNoSymbol, parseMoneyInput } from "../../utils/format";
import { Currency, Quote } from "@/features/exchange/types";
import { fetchQuote } from "@/features/exchange/services/client";

interface Props {
    name: string;
    initialSend: string;
    initialReceive: string;
    monthlyLimit: number;
    monthlyUsed: number;
    onCancel: () => void;
    onSubmit?: () => void;
}

export default function EditAndResendForm({
    name,
    initialSend,
    initialReceive,
    monthlyLimit,
    monthlyUsed,
    onCancel,
    onSubmit,
}: Props) {
    const percent = Math.min((monthlyUsed / monthlyLimit) * 100, 100);

    // moedas (dinâmico)
    const [sendCurrency, setSendCurrency] = useState<Currency>("BRL");
    const [receiveCurrency, setReceiveCurrency] = useState<Currency>("MXN");

    const flags: Record<Currency, string> = {
        BRL: "/images/flags/flagbrasilsaldo.png",
        MXN: "/images/flags/flagmexicosaldo.png",
    };

    const currencies: { code: Currency; name: string }[] = [
        { code: "BRL", name: "Real Brasileiro" },
        { code: "MXN", name: "Peso Mexicano" },
    ];

    const [sendInput, setSendInput] = useState<string>("");
    const [sendAmountNum, setSendAmountNum] = useState<number>(0);
    const [committedAmount, setCommittedAmount] = useState<number>(0);
    const typingTimeoutRef = useRef<number | null>(null);

    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        setSendInput((prev) => {
            if (!prev) return "";
            const num = parseMoneyInput(prev, sendCurrency);
            return fmtMoneyNoSymbol(num, sendCurrency);
        });
    }, [sendCurrency]);

    const handleSendChange = (selected: Currency) => {
        setSendCurrency(selected);
        if (selected === receiveCurrency) {
            const alt = currencies.find(c => c.code !== selected)?.code ?? (selected === "BRL" ? "MXN" : "BRL");
            setReceiveCurrency(alt as Currency);
        }
    };

    const handleReceiveChange = (selected: Currency) => {
        setReceiveCurrency(selected);
        if (selected === sendCurrency) {
            const alt = currencies.find(c => c.code !== selected)?.code ?? (selected === "BRL" ? "MXN" : "BRL");
            setSendCurrency(alt as Currency);
        }
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

    const isTooLow = !!quote && quote.breakdown.baseAfterFees <= 0;
    const minRequired = isTooLow
        ? +(quote!.fees.fixed / (1 - quote!.fees.percent)).toFixed(2)
        : null;

    return (
        <div className="pt-2 flex justify-center">
            <div className="w-full max-w-sm">
                <div className="text-lg sm:text-xl font-semibold text-black mb-4 text-center sm:text-left">
                    Repita esta transferência
                </div>

                {/* Valor a enviar */}
                <div className="mb-4">
                    <label className="block text-primary mb-2 text-sm sm:text-base">
                        Valor a enviar
                    </label>

                    <div className="flex flex-row sm:items-center gap-3 justify-start">
                        {/* input + sufixo */}
                        <div className="relative w-[190px] sm:w-[230px]">
                            <input
                                type="text"
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
                                inputMode="decimal"
                                pattern="[0-9]*[.,]?[0-9]*"
                                placeholder={sendCurrency === "BRL" ? "0,00" : "0.00"}
                                className="w-full px-4 pr-16 py-3 border border-gray-300 rounded-md text-primary"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-bold text-gray-500">
                                {sendCurrency}
                            </span>
                        </div>

                        {/* bandeira + select */}
                        <div className="flex items-center gap-2 ml-0 sm:ml-2 relative justify-end">
                            <img
                                src={flags[sendCurrency]}
                                alt={sendCurrency}
                                className="h-8 w-8 rounded-full ring-2 ring-gray-200"
                            />
                            <select
                                value={sendCurrency}
                                onChange={(e) => handleSendChange(e.target.value as Currency)}
                                className="text-black font-semibold bg-transparent outline-none appearance-none pl-2 pr-6"
                            >
                                {currencies.map(c => (
                                    <option key={c.code} value={c.code}>{c.code}</option>
                                ))}
                            </select>
                            <svg className="w-4 h-4 absolute right-0 pointer-events-none text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Valor a receber */}
                <div className="mb-6">
                    <label className="block text-primary mb-2 text-sm sm:text-base">
                        Valor a receber
                    </label>

                    <div className="flex flex-row sm:items-center gap-3 justify-start">
                        <div className="relative w-[190px] sm:w-[230px]">
                            <input
                                type="text"
                                placeholder={receiveCurrency === "BRL" ? "0,00" : "0.00"}
                                value={quote ? fmtMoneyNoSymbol(Math.max(0, quote.breakdown.receiveAmount), receiveCurrency) : ""}
                                readOnly
                                className="w-full px-4 pr-16 py-3 border border-gray-300 rounded-md text-primary"
                            />
                            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-bold text-gray-500">
                                {receiveCurrency}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 ml-0 sm:ml-2 relative justify-end">
                            <img
                                src={flags[receiveCurrency]}
                                alt={receiveCurrency}
                                className="h-8 w-8 rounded-full ring-2 ring-gray-200"
                            />
                            <select
                                value={receiveCurrency}
                                onChange={(e) => handleReceiveChange(e.target.value as Currency)}
                                className="text-black font-semibold bg-transparent outline-none appearance-none pl-2 pr-6"
                            >
                                {currencies.map(c => (
                                    <option key={c.code} value={c.code}>{c.code}</option>
                                ))}
                            </select>
                            <svg className="w-4 h-4 absolute right-0 pointer-events-none text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {isTooLow && minRequired !== null && (
                        <p className="text-red-500 text-xs mt-1">
                            Valor muito baixo para cobrir as taxas. Mínimo aproximado: {fmtMoneyNoSymbol(minRequired, sendCurrency)} {sendCurrency}
                        </p>
                    )}
                </div>

                {/* Dados do destinatário */}
                <div className="mt-6">
                    <div className="text-lg sm:text-xl font-semibold text-black mb-3">Dados do destinatário</div>
                    <div className="space-y-3">
                        <input
                            defaultValue={name}
                            className="w-full max-w-sm px-4 py-3 border border-gray-300 rounded-md text-primary"
                        />
                        <input
                            defaultValue="renatolhp@gmail.com"
                            className="w-full max-w-sm px-4 py-3 border border-gray-300 rounded-md text-primary"
                        />
                        <input
                            defaultValue="+55 11 91302 4000"
                            className="w-full max-w-sm px-4 py-3 border border-gray-300 rounded-md text-primary"
                        />
                    </div>
                </div>

                {/* Resumo */}
                <div className="mt-8">
                    <div className="text-lg sm:text-xl font-semibold text-black mb-3">Resumo</div>

                    <div className="w-full max-w-sm rounded-md border border-gray-300 p-4 sm:p-5">
                        <div className="text-primary text-sm sm:text-base">Valor convertido (recebido):</div>
                        <div className="text-black font-normal text-base sm:text-lg">
                            {quote ? fmtMoneyNoSymbol(Math.max(0, quote.breakdown.receiveAmount), receiveCurrency) : "—"}{" "}
                            <span className="text-primary font-normal text-xs sm:text-sm">{receiveCurrency}</span>
                        </div>

                        <div className="mt-3 text-primary text-sm sm:text-base">Taxas aplicadas:</div>
                        <div className="text-black font-normal text-base sm:text-lg">
                            {quote ? fmtMoneyNoSymbol(quote.fees.total, sendCurrency) : "—"}{" "}
                            <span className="text-primary font-normal text-xs sm:text-sm">{sendCurrency}</span>
                        </div>

                        <div className="mt-3 text-primary text-sm sm:text-base">Total após taxas (base):</div>
                        <div className="text-black font-normal text-base sm:text-lg">
                            {quote ? fmtMoneyNoSymbol(Math.max(0, quote.breakdown.baseAfterFees), sendCurrency) : "—"}{" "}
                            <span className="text-primary font-normal text-xs sm:text-sm">{sendCurrency}</span>
                        </div>

                        <hr className="my-4 border-gray-200" />

                        <div className="flex items-center justify-between text-primary text-xs sm:text-sm">
                            <span>Máximo de transferência mês:</span>
                            <span>{fmtBRL(monthlyLimit)}</span>
                        </div>

                        <div className="mt-2 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                            <div
                                className="h-2 rounded-full bg-secondary transition-all duration-500"
                                style={{ width: `${percent}%` }}
                                aria-valuenow={Math.round(percent)}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                role="progressbar"
                            />
                        </div>

                        <div className="mt-2 text-xs text-primary">
                            Usado: {fmtBRL(monthlyUsed)} • Restante: {fmtBRL(Math.max(monthlyLimit - monthlyUsed, 0))} ({Math.round(percent)}%)
                        </div>
                    </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-col items-center justify-center gap-3">
                    <CustomButton
                        text="Fazer transferência"
                        onClick={onSubmit}
                        className="w-full"
                        disabled={!quote || loading || isTooLow}
                    />
                    <button type="button" className="text-primary underline underline-offset-2" onClick={onCancel}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}