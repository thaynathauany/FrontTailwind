"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { fmtBRL, fmtCurrency, fmtMoneyNoSymbol, parseMoneyInput } from "@/utils/format";
import TransferReceipt from "@/components/Transfers/TransferReceipt";
import { ReceiptData } from "@/types/receipt";
import { Currency, Quote } from "@/features/exchange/types";
import { fetchQuote } from "@/features/exchange/services/client";

type DepositMode = "wallet" | "recipient";
type Stage = "form" | "receipt";

const FLAGS: Record<Currency, string> = {
    BRL: "/images/flags/flagbrasilsaldo.png",
    MXN: "/images/flags/flagmexicosaldo.png",
};

const CURRENCIES: Currency[] = ["BRL", "MXN"];

function CurrencyInput({
    label,
    value,
    onChange,
    currency,
    setCurrency,
    otherSelected,
    placeholder,
    flagAlt,
    onBlur,
    readOnly = false,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    currency: Currency;
    setCurrency: (c: Currency) => void;
    otherSelected: Currency;
    placeholder: string;
    flagAlt?: string;
    onBlur?: () => void;
    readOnly?: boolean;
}) {
    return (
        <div className="mt-4">
            <label className="block text-primary mb-2 text-sm sm:text-base">{label}</label>

            <div className="flex flex-row sm:items-center gap-3 justify-start w-full md:w-sm">
                <div className="relative w-[190px] sm:w-[230px]">
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*[.,]?[0-9]*"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        className="w-full px-4 pr-16 py-3 border border-gray-300 rounded-md text-primary"
                        readOnly={readOnly}
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-bold text-gray-500">
                        {currency}
                    </span>
                </div>

                <div className="flex items-center gap-2 ml-0 sm:ml-2 relative">
                    <img
                        src={FLAGS[currency]}
                        alt={flagAlt ?? currency}
                        className="h-8 w-8 rounded-full ring-2 ring-gray-200"
                    />
                    <select
                        value={currency}
                        onChange={(e) => {
                            const next = e.target.value as Currency;
                            if (next === otherSelected) {
                                setCurrency(next);
                            } else {
                                setCurrency(next);
                            }
                        }}
                        className="text-black font-semibold bg-transparent outline-none appearance-none pl-2 pr-6"
                    >
                        {CURRENCIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <svg
                        className="w-4 h-4 absolute right-0 pointer-events-none text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function Transference() {
    const [stage, setStage] = useState<Stage>("form");

    const [sendCurrency, setSendCurrency] = useState<Currency>("BRL");
    const [receiveCurrency, setReceiveCurrency] = useState<Currency>("MXN");

    const [sendInput, setSendInput] = useState<string>("");
    const [sendAmountNum, setSendAmountNum] = useState<number>(0);

    const [committedAmount, setCommittedAmount] = useState<number>(0);
    const typingTimeoutRef = useRef<number | null>(null);

    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    const [mode, setMode] = useState<DepositMode>("wallet");
    const [receiverName, setReceiverName] = useState("");
    const [receiverId, setReceiverId] = useState("");
    const [receiverPix, setReceiverPix] = useState("");

    const monthlyLimit = 50000;
    const monthlyUsed = 810;
    const percent = useMemo(
        () => Math.min((monthlyUsed / monthlyLimit) * 100, 100),
        [monthlyLimit, monthlyUsed]
    );

    useEffect(() => {
        setSendInput((prev) => {
            if (!prev) return "";
            const num = parseMoneyInput(prev, sendCurrency);
            return fmtMoneyNoSymbol(num, sendCurrency);
        });
    }, [sendCurrency]);

    const handleSendCurrency = (next: Currency) => {
        setSendCurrency(next);
        if (next === receiveCurrency) setReceiveCurrency(next === "BRL" ? "MXN" : "BRL");
    };
    const handleReceiveCurrency = (next: Currency) => {
        setReceiveCurrency(next);
        if (next === sendCurrency) setSendCurrency(next === "BRL" ? "MXN" : "BRL");
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

    const [receiptData, setReceiptData] = useState<ReceiptData | undefined>(undefined);
    const handleConfirm = () => {
        if (!quote) return;

        const now = new Date();
        const dateStr = now.toLocaleDateString("pt-BR");
        const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

        const receipt: ReceiptData = {
            txNumber: "#" + quote.quoteId.slice(0, 9),
            datetime: `${dateStr} – ${timeStr}`,
            sentLabel: fmtCurrency(quote.breakdown.sendAmount, quote.from),
            feeLabel: fmtCurrency(quote.fees.total, quote.from),
            convertedLabel: fmtCurrency(quote.breakdown.receiveAmount, quote.to),
            beneficiary:
                mode === "recipient"
                    ? {
                        name: receiverName || "—",
                        rfc: receiverId || undefined,
                        account: receiverPix || undefined,
                        bank: sendCurrency === "MXN" ? "BBVA" : "Banco do Brasil",
                        countryCity: sendCurrency === "MXN" ? "México / Cidade" : "Brasil / São Paulo",
                        route: "8327183671478612784",
                        method: "CoDi",
                    }
                    : {
                        name: "Minha carteira",
                        bank: sendCurrency === "MXN" ? "BBVA" : "Banco do Brasil",
                    },
            notes: [
                "Este comprovante não tem validade jurídica.",
                "Guarde para seus registros.",
            ],
        };

        setReceiptData(receipt);
        setStage("receipt");
    };

    const resetToNew = () => {
        setStage("form");
        setReceiptData(undefined);
    };

    if (stage === "receipt") {
        return <TransferReceipt data={receiptData} onNewTransfer={resetToNew} />;
    }

    return (
        <div className="flex flex-col w-full sm:max-w-md px-8 sm:px-6 lg:px-0 mx-auto mt-10">
            <h1 className="text-2xl font-semibold text-black">Nova transferência</h1>

            {/* Campo 1: Valor a enviar (formata por moeda, sem símbolo) */}
            <CurrencyInput
                label="Valor a enviar"
                value={sendInput}
                onChange={(raw) => {
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
                currency={sendCurrency}
                setCurrency={handleSendCurrency}
                otherSelected={receiveCurrency}
                placeholder={sendCurrency === "BRL" ? "0,00" : "0.00"}
                flagAlt="Moeda de envio"
            />

            {/* Campo 2: Valor a receber (somente leitura, já com taxas) */}
            <CurrencyInput
                label="Valor a receber"
                value={
                    quote
                        ? fmtMoneyNoSymbol(Math.max(0, quote.breakdown.receiveAmount), receiveCurrency)
                        : ""
                }
                onChange={() => { }}
                currency={receiveCurrency}
                setCurrency={handleReceiveCurrency}
                otherSelected={sendCurrency}
                placeholder={receiveCurrency === "BRL" ? "0,00" : "0.00"}
                flagAlt="Moeda de recebimento"
                readOnly
            />

            {/* alerta de valor insuficiente */}
            {isTooLow && minRequired !== null && (
                <p className="text-red-500 text-xs mt-1">
                    Valor muito baixo para cobrir as taxas. Mínimo aproximado:{" "}
                    {fmtMoneyNoSymbol(minRequired, sendCurrency)} {sendCurrency}
                </p>
            )}

            {/* Opções */}
            <fieldset className="mt-4 space-y-2">
                <label className="flex items-center gap-2 text-primary cursor-pointer">
                    <input
                        type="radio"
                        className="accent-secondary"
                        checked={mode === "wallet"}
                        onChange={() => setMode("wallet")}
                    />
                    Depositar na minha carteira
                </label>

                <label className="flex items-center gap-2 text-primary cursor-pointer">
                    <input
                        type="radio"
                        className="accent-secondary"
                        checked={mode === "recipient"}
                        onChange={() => setMode("recipient")}
                    />
                    Incluir destinatário
                </label>
            </fieldset>

            {/* Dados do destinatário */}
            {mode === "recipient" && (
                <>
                    <h2 className="mt-6 text-lg sm:text-xl font-semibold text-black">Dados do destinatário</h2>
                    <div className="mt-3 space-y-3 w-full md:w-sm">
                        <input
                            value={receiverName}
                            onChange={(e) => setReceiverName(e.target.value)}
                            placeholder="Nome completo"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md text-primary"
                        />
                        <input
                            value={receiverId}
                            onChange={(e) => setReceiverId(e.target.value)}
                            placeholder="Documento de identificação"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md text-primary"
                        />
                        <input
                            value={receiverPix}
                            onChange={(e) => setReceiverPix(e.target.value)}
                            placeholder="Chave PIX ou CoDi"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md text-primary"
                        />
                    </div>
                </>
            )}

            {/* Resumo */}
            <h2 className="mt-6 text-lg sm:text-xl font-semibold text-black">Resumo</h2>
            <div className="mt-2 rounded-md border border-gray-300 p-4 sm:p-5 max-w-sm">
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
                    Usado: {fmtBRL(monthlyUsed)} • Restante:{" "}
                    {fmtBRL(Math.max(monthlyLimit - monthlyUsed, 0))} ({Math.round(percent)}%)
                </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex items-center justify-center max-w-sm">
                <CustomButton
                    text="Confirmar transferência"
                    onClick={handleConfirm}
                    className="w-full"
                    disabled={!quote || loading || isTooLow}
                />
            </div>
        </div>
    );
}