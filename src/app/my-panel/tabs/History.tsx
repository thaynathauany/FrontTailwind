"use client";

import { useState } from "react";
import HistoryHeader from "@/components/history/HistoryHeader";
import HistoryCard from "@/components/history/HistoryCard";
import { HistoryItem } from "@/types/history";

interface Props {
    lastUpdated?: Date | string;
    items?: HistoryItem[];
    onOpenFilter?: () => void;
    onNewTransfer?: () => void;
}

export default function History({
    lastUpdated = new Date(),
    items = [
        {
            id: "1",
            createdAt: "2025-07-20T12:30:00Z",
            name: "Renato Araujo da Silva",
            amount: 535,
            currencyCode: "BLR",
            status: "completed",
            code: "827 763 8190",
            details: {
                enviou: "535,00 BLR",
                tarifas: "5,00 BLR",
                convertemos: "530,00 BLR",
                cambio: "1 MXN = 0,2924 BRL",
                tipoBeneficiario: "Pessoa física",
                codBanco: "001",
                codAgencia: "1234",
                numeroConta: "1234-5",
                tipoConta: "Corrente",
                titular: "Renato Araujo da Silva",
                banco: "Banco do Brasil S.A.",
            },
        },
    ],
    onOpenFilter,
    onNewTransfer,
}: Props) {
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());
    const [editId, setEditId] = useState<string | null>(null);

    const toggle = (id: string) =>
        setOpenIds(prev => {
            const copy = new Set(prev);
            copy.has(id) ? copy.delete(id) : copy.add(id);
            return copy;
        });

    const startEdit = (id: string) => {
        setOpenIds(new Set());
        setEditId(id);
    };

    const cancelEdit = () => setEditId(null);

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <HistoryHeader lastUpdated={lastUpdated} onOpenFilter={onOpenFilter} onNewTransfer={onNewTransfer} />

            <div className="mt-4 space-y-4">
                {items.map(item => (
                    <HistoryCard
                        key={item.id}
                        item={item}
                        open={openIds.has(item.id)}
                        onToggle={toggle}
                        isEditing={editId === item.id}
                        onStartEdit={startEdit}
                        onCancelEdit={cancelEdit}
                        // passa os dados do back p/ resumo:
                        monthlyLimit={50000}
                        monthlyUsed={19810}
                    />
                ))}
            </div>
        </div>
    );
}