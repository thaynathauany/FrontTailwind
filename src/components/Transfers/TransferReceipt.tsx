"use client";

import CustomButton from "@/components/ui/CustomButton";
import { ReceiptData } from "@/types/receipt";


interface Props {
    data?: ReceiptData;
    onNewTransfer?: () => void;
}

export default function TransferReceipt({ data, onNewTransfer }: Props) {
    const demo: ReceiptData = {
        txNumber: "#712879813",
        datetime: "03/07/2025 – 14:23",
        sentLabel: "R$ 3.200,00",
        feeLabel: "R$ 65,00",
        convertedLabel: "MXN$ 10.500,00",
        beneficiary: {
            name: "Juan Pérez Ramirez",
            rfc: "JORR3231136682XXX",
            account: "BBVA",
            bank: "BBVA",
            countryCity: "México / Cidade",
            route: "8327183671478612784",
            method: "CoDi",
        },
        notes: [
            "Este comprovante não tem validade jurídica.",
            "Guarde para seus registros."
        ],
    };

    const d = data ?? demo;

    const shareReceipt = async () => {
        const text = `Comprovante de transferência
Número: ${d.txNumber}
Data/Hora: ${d.datetime}
Enviado: ${d.sentLabel}
Taxas: ${d.feeLabel}
Convertido: ${d.convertedLabel}
Beneficiário: ${d.beneficiary.name}`;

        try {
            if (navigator.share) {
                await navigator.share({ title: "Comprovante", text });
            } else {
                await navigator.clipboard.writeText(text);
                alert("Comprovante copiado para a área de transferência.");
            }
        } catch {
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-lg mx-auto text-center px-4 sm:px-0">
            <div className="mx-auto mb-4 mt-2 flex h-12 w-12 items-center justify-center rounded-full ring-2 ring-secondary">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-secondary" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <h1 className="text-xl font-semibold text-secondary mb-4">
                Transferência realizada com sucesso!
            </h1>

            {/* cartão do comprovante */}
            <div className="w-full sm:w-sm px-4 sm:px-6 lg:px-0 mx-auto rounded-xl border border-gray-300/80 text-left bg-white overflow-hidden">
                <div className="grid grid-cols-2 gap-2 p-4">
                    <div className="text-primary text-xs">Número da transação</div>
                    <div className="text-primary text-xs">Data/Hora</div>
                    <div className="text-black text-sm font-medium">{d.txNumber}</div>
                    <div className="text-black text-sm font-medium">{d.datetime}</div>
                </div>

                <div className="h-[1px] bg-gray-200" />

                {/* detalhes do pagamento */}
                <div className="p-4">
                    <div className="mb-2 bg-gray-100 px-3 py-1 text-primary text-xs">
                        Detalhes do pagamento
                    </div>

                    <div className="grid grid-cols-2 gap-y-3">
                        <div>
                            <div className="text-primary text-sm">Valor enviado:</div>
                            <div className="text-black">{d.sentLabel}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-primary text-sm">Taxas aplicadas:</div>
                            <div className="text-black">{d.feeLabel}</div>
                        </div>

                        <div className="col-span-2">
                            <div className="text-primary text-sm">Valor convertido:</div>
                            <div className="text-black">{d.convertedLabel}</div>
                        </div>
                    </div>

                    {/* beneficiário */}
                    <div className="mt-4 mb-2 bg-gray-100 px-3 py-1 text-primary text-xs">
                        Dados do destinatário
                    </div>

                    <div className="space-y-1 text-sm">
                        <Row label="Nome:" value={d.beneficiary.name} />
                        {d.beneficiary.rfc && <Row label="RFC:" value={d.beneficiary.rfc} />}
                        {d.beneficiary.account && <Row label="Conta destino:" value={d.beneficiary.account} />}
                        {d.beneficiary.bank && <Row label="Banco:" value={d.beneficiary.bank} />}
                        {d.beneficiary.countryCity && <Row label="País / Cidade:" value={d.beneficiary.countryCity} />}
                        {d.beneficiary.route && <Row label="Rota/ID:" value={d.beneficiary.route} />}
                        {d.beneficiary.method && <Row label="Forma de recebimento:" value={d.beneficiary.method} />}
                    </div>

                    {/* observações */}
                    <div className="my-4 h-[1px] bg-gray-200" />
                    <div className="text-xs text-primary">
                        <div className="font-medium mb-1">Observações:</div>
                        <ul className="list-disc pl-5 space-y-1">
                            {(d.notes ?? []).map((n, i) => (
                                <li key={i}>{n}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ações */}
            <div className="mt-5 flex flex-col items-center justify-center gap-3 w-full sm:w-sm mx-auto">
                <CustomButton
                    text="Compartilhar comprovante"
                    onClick={shareReceipt}
                    variant="outline"
                    fullWidth
                    className="w-full"
                />
                <CustomButton
                    text="Fazer nova transferência"
                    onClick={onNewTransfer}
                    fullWidth
                    className="w-full"
                />
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start justify-between gap-3">
            <span className="text-primary">{label}</span>
            <span className="text-black text-right">{value}</span>
        </div>
    );
}