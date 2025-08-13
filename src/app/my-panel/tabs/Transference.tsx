"use client";

import { useMemo, useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { fmtBRL } from "@/utils/format";
import TransferReceipt from "@/components/Transfers/TransferReceipt";
import { ReceiptData } from "@/types/receipt";

type DepositMode = "wallet" | "recipient";
type CurrencyCode = "BRL" | "MXN";
type Stage = "form" | "receipt";

const FLAGS: Record<CurrencyCode, string> = {
    BRL: "/images/flags/flagbrasilsaldo.png",
    MXN: "/images/flags/flagmexicosaldo.png",
};

const CURRENCIES: CurrencyCode[] = ["BRL", "MXN"];

function CurrencyInput({
    label,
    value,
    onChange,
    currency,
    setCurrency,
    otherSelected,
    placeholder,
    flagAlt,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    currency: CurrencyCode;
    setCurrency: (c: CurrencyCode) => void;
    otherSelected: CurrencyCode;
    placeholder: string;
    flagAlt?: string;
}) {
    return (
        <div className="mt-4">
            <label className="block text-primary mb-2 text-sm sm:text-base">{label}</label>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative w-full sm:w-[230px]">
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*[.,]?[0-9]*"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-4 pr-16 py-3 border border-gray-300 rounded-md text-primary"
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
                            const next = e.target.value as CurrencyCode;
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
    const [sendValue, setSendValue] = useState("10000.00");
    const [receiveValue, setReceiveValue] = useState("2936.26");
    const [sendCurrency, setSendCurrency] = useState<CurrencyCode>("MXN");
    const [receiveCurrency, setReceiveCurrency] = useState<CurrencyCode>("BRL");

    const handleSendCurrency = (next: CurrencyCode) => {
        setSendCurrency(next);
        if (next === receiveCurrency) setReceiveCurrency(next === "BRL" ? "MXN" : "BRL");
    };
    const handleReceiveCurrency = (next: CurrencyCode) => {
        setReceiveCurrency(next);
        if (next === sendCurrency) setSendCurrency(next === "BRL" ? "MXN" : "BRL");
    };

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

    const withCur = (cur: CurrencyCode, v: string) =>
        (cur === "BRL" ? "R$ " : "MXN$ ") + v.replace(".", ",");

    // confirmar -> vai para comprovante
    const handleConfirm = () => {
        const now = new Date();
        const dateStr = now.toLocaleDateString("pt-BR");
        const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

        const receipt: ReceiptData = {
            txNumber: "#712879813", // mock; virá do back
            datetime: `${dateStr} – ${timeStr}`,
            sentLabel: withCur(sendCurrency, sendValue),
            feeLabel: withCur(sendCurrency, "65,00"),
            convertedLabel: withCur(sendCurrency, "10.500,00"),
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

    const [receiptData, setReceiptData] = useState<ReceiptData | undefined>(undefined);

    const resetToNew = () => {
        setStage("form");
        setReceiptData(undefined);
    };

    if (stage === "receipt") {
        return <TransferReceipt data={receiptData} onNewTransfer={resetToNew} />;
    }

    // ---------- FORMULÁRIO ----------
    return (
        <div className="flex flex-col w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto">
            <h1 className="text-2xl font-semibold text-black">Nova transferência</h1>

            <CurrencyInput
                label="Valor a enviar"
                value={sendValue}
                onChange={setSendValue}
                currency={sendCurrency}
                setCurrency={handleSendCurrency}
                otherSelected={receiveCurrency}
                placeholder="10000.00"
                flagAlt="Moeda de envio"
            />

            <CurrencyInput
                label="Valor a receber"
                value={receiveValue}
                onChange={setReceiveValue}
                currency={receiveCurrency}
                setCurrency={handleReceiveCurrency}
                otherSelected={sendCurrency}
                placeholder="2936.26"
                flagAlt="Moeda de recebimento"
            />

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
                    <div className="mt-3 space-y-3">
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
                <div className="text-primary text-sm sm:text-base">Valor convertido:</div>
                <div className="text-black font-normal text-base sm:text-lg">
                    10.000,00 <span className="text-primary font-normal text-xs sm:text-sm">{sendCurrency}</span>
                </div>

                <div className="mt-3 text-primary text-sm sm:text-base">Taxas aplicadas:</div>
                <div className="text-black font-normal text-base sm:text-lg">
                    122,50 <span className="text-primary font-normal text-xs sm:text-sm">{sendCurrency}</span>
                </div>

                <div className="mt-3 text-primary text-sm sm:text-base">Total:</div>
                <div className="text-black font-normal text-base sm:text-lg">
                    198,10 <span className="text-primary font-normal text-xs sm:text-sm">{sendCurrency}</span>
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
            <div className="mt-6 flex items-center justify-center">
                <CustomButton text="Confirmar transferência" onClick={handleConfirm} className="w-full" />
            </div>
        </div>
    );
}