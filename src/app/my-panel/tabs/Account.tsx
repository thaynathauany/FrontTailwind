"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import CustomButton from "@/components/ui/CustomButton";

type Balance = {
    code: "BRL" | "MXN";
    amount: number;
    flagSrc: string;
};

interface AccountProps {
    lastUpdated?: Date | string;
    balances?: Balance[];
    onAddFunds?: () => void;
}

export default function Account({
    lastUpdated = new Date(),
    balances = [
        { code: "BRL", amount: 6098, flagSrc: "/images/flags/flagbrasilsaldo.png" },
        { code: "MXN", amount: 6098, flagSrc: "/images/flags/flagmexicosaldo.png" },
    ],
    onAddFunds,
}: AccountProps) {
    const t = useTranslations("MyPanel.account");
    const locale = useLocale();

    const dt = useMemo(() => new Date(lastUpdated), [lastUpdated]);

    const dateStr = useMemo(
        () =>
            new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit", year: "numeric" }).format(dt),
        [dt, locale]
    );

    const timeStr = useMemo(
        () =>
            new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hour12: false }).format(dt),
        [dt, locale]
    );

    const fmt = (code: Balance["code"], value: number) => {
        const num = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
        return code === "BRL" ? t("currency.brl", { value: num }) : t("currency.mxn", { value: num });
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl font-semibold text-black">{t("title")}</h1>
            <p className="mt-2 text-base text-primary">
                {t("updatedAt")} {dateStr} {t("at")} {timeStr}
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {balances.map((b) => (
                    <div
                        key={b.code}
                        className="flex items-center gap-4 rounded-[22px] border border-gray-300/70 px-6 py-6 shadow-[0_0_0_1px_rgba(0,0,0,0.02)]"
                    >
                        {/* Flag */}
                        <div className="relative h-12 w-12 rounded-full ring-2 ring-gray-200 bg-white overflow-hidden flex-shrink-0">
                            <img
                                src={b.flagSrc}
                                alt={b.code === "BRL" ? "Bandeira do Brasil" : "Bandeira do México"}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Amount */}
                        <div className="text-xl font-semibold text-secondary">{fmt(b.code, b.amount)}</div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <CustomButton
                    text={t("addFunds")}
                    onClick={() => { onAddFunds }}
                />
            </div>
        </div>
    );
}