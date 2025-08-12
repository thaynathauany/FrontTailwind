"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { HistoryItem } from "@/types/history";
import HistoryDetails from "./HistoryDetails";
import EditAndResendForm from "./EditAndResendForm";
import { fmtDate, fmtNumber } from "../../utils/format";

interface Props {
    item: HistoryItem;
    open: boolean;
    onToggle: (id: string) => void;
    isEditing?: boolean;            // controlado pelo pai (opcional)
    onStartEdit?: (id: string) => void;
    onCancelEdit?: () => void;

    // back data p/ resumo:
    monthlyLimit?: number;
    monthlyUsed?: number;
}

export default function HistoryCard({
    item,
    open,
    onToggle,
    isEditing = false,
    onStartEdit,
    onCancelEdit,
    monthlyLimit = 50000,
    monthlyUsed = 19810,
}: Props) {
    const t = useTranslations("MyPanel.history");
    const locale = useLocale();

    const { dateStr, timeStr } = useMemo(() => fmtDate(item.createdAt, locale), [item.createdAt, locale]);
    const amount = useMemo(() => fmtNumber(item.amount, locale), [item.amount, locale]);

    const statusClass =
        item.status === "completed" ? "text-green" : item.status === "pending" ? "text-amber-600" : "text-rose-600";
    const statusLabel =
        item.status === "completed" ? t("status.completed") : item.status === "pending" ? t("status.pending") : t("status.failed");

    const initialSend = "10000.00";
    const initialReceive = "2936.26";

    return (
        <article className="rounded-[22px] border border-gray-300/70 px-5 sm:px-6 py-5">
            {/* Linha 1: data + status */}
            <div className="flex items-start justify-between gap-3">
                <div className="text-sm text-primary">
                    {dateStr} {t("at")} {timeStr}
                </div>
                <div className={`text-sm font-normal ${statusClass}`}>{statusLabel}</div>
            </div>

            {/* Linha 2: nome + valor */}
            <div className="mt-1 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black">{item.name}</h2>
                <div className="text-xl font-semibold text-black leading-none">
                    {amount}
                    <span className="ml-2 align-baseline text-sm text-primary font-normal">{item.currencyCode}</span>
                </div>
            </div>

            <hr className="my-3 border-gray-200" />

            {/* Ações (somem quando entra em edição) */}
            {!isEditing && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-primary">COD: {item.code}</div>

                    <div className="flex items-center gap-6">
                        <button
                            type="button"
                            onClick={() => onToggle(item.id)}
                            className="text-secondary font-normal underline underline-offset-2 text-sm sm:text-base"
                        >
                            {open ? "Ocultar detalhes" : "Exibir detalhes"}
                        </button>
                        <button
                            type="button"
                            onClick={() => onStartEdit?.(item.id)}
                            className="text-secondary font-normal underline underline-offset-2 text-sm sm:text-base"
                        >
                            Editar e reenviar
                        </button>
                    </div>
                </div>
            )}

            {/* Detalhes */}
            {!isEditing && open && item.details && <HistoryDetails data={item.details} />}

            {/* Edição */}
            {isEditing && (
                <EditAndResendForm
                    name={item.name}
                    initialSend={initialSend}
                    initialReceive={initialReceive}
                    monthlyLimit={monthlyLimit}
                    monthlyUsed={monthlyUsed}
                    onCancel={onCancelEdit ?? (() => { })}
                    onSubmit={() => {
                        // TODO: submit
                    }}
                />
            )}
        </article>
    );
}