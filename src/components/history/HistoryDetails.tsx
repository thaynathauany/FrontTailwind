"use client";

import { HistoryDetailsData } from "@/types/history";

export default function HistoryDetails({ data }: { data: HistoryDetailsData }) {
    const rows: Array<[string, string]> = [
        ["Enviou", data.enviou],
        ["Tarifas", data.tarifas],
        ["Convertemos", data.convertemos],
        ["Taxa de câmbio", data.cambio],
        ["Tipo de beneficiário", data.tipoBeneficiario],
        ["Código do banco", data.codBanco],
        ["Código da Agência", data.codAgencia],
        ["Número da conta", data.numeroConta],
        ["Tipo de conta", data.tipoConta],
        ["Nome do titular da conta", data.titular],
        ["Nome do banco", data.banco],
    ];

    return (
        <div className="pt-6">
            <div className="grid grid-cols-2 gap-y-3">
                {rows.map(([label, value]) => (
                    <div key={label} className="contents">
                        <span className="text-primary text-xs sm:text-base">{label}</span>
                        <span className="text-primary text-right break-words text-xs sm:text-base">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}