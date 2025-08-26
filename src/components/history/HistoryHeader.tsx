"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import CustomButton from "@/components/ui/CustomButton";
import { fmtDate } from "@/utils/format";

interface Props {
    lastUpdated?: Date | string;
    onOpenFilter?: () => void;
    onNewTransfer?: () => void;
}

export default function HistoryHeader({
    lastUpdated = new Date(),
    onOpenFilter,
    onNewTransfer,
}: Props) {
    const t = useTranslations("MyPanel.history");
    const locale = useLocale();
    const dt = useMemo(() => new Date(lastUpdated), [lastUpdated]);
    const { dateStr, timeStr } = fmtDate(dt, locale);
    const noop = () => { };

    return (
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            {/* Esquerda: título + data */}
            <div className="flex-1">
                <h1 className="text-2xl font-semibold text-black">
                    {t("title")}
                </h1>
                <p className="mt-2 text-base text-primary font-normal">
                    {t("updatedAt")} {dateStr} {t("at")} {timeStr}
                </p>
            </div>

            {/* Direita: Filtro + CTA */}
            <div className="flex items-center gap-4 justify-between">
                <button
                    type="button"
                    onClick={onOpenFilter ?? noop}
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                    aria-label={t("filter")}
                >
                    <img
                        src="/images/icones/filtro.png"
                        alt=""
                        className="h-5 w-5"
                        aria-hidden
                    />
                    <span className="text-base font-normal">{t("filter")}</span>
                </button>

                <CustomButton
                    text={t("newTransfer")}
                    onClick={onNewTransfer ?? noop}
                />
            </div>
        </header>
    );
}