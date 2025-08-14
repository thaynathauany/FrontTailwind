"use client";

import AuthHeader from "@/components/layout/AuthHeader.tsx/page";
import CustomButton from "@/components/ui/CustomButton";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { signUp } from "@/features/auth/signup/api/signUp.service";

interface StepOneProps {
    onNext: () => void;
}

export default function StepOne({ onNext }: StepOneProps) {
    const t = useTranslations("SignUp.step1");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function handleSubmit(e?: React.FormEvent) {
        e?.preventDefault?.();
        setErr(null);
        setLoading(true);
        try {
            await signUp({ name, email, phone });
            onNext();
        } catch (error: any) {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "Erro ao enviar. Tente novamente.";
            setErr(msg);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col min-h-[450px] sm:min-h-[700px] w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto">
            <div className="hidden lg:block h-[72px]" />

            <div className="flex-1 flex items-start sm:items-center justify-center pt-2 sm:pt-12">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="w-full space-y-5">
                        <div className="flex flex-col space-y-2 text-center sm:text-left">
                            <h1 className="text-xl font-semibold text-black">{t("title")}</h1>
                            <p className="text-base text-primary">{t("description")}</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder={t("placeholder.name")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                            />
                            <input
                                type="email"
                                placeholder={t("placeholder.email")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                            <input
                                type="tel"
                                placeholder={t("placeholder.phone")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                autoComplete="tel"
                            />

                            {err && <p className="text-sm text-red-600">{err}</p>}

                            <CustomButton
                                text={loading ? "Enviando..." : t("buttonNext")}
                                className="mt-4 w-full"
                                type="submit"
                                disabled={loading}
                                onClick={() => {
                                    handleSubmit();
                                }}
                            />
                        </form>
                    </div>
                </div>
            </div>

            <div className="pb-8 sm:pb-6">
                <p className="text-center text-sm text-primary">
                    {t("footerText")}{" "}
                    <a href="/login" className="text-black font-medium">
                        {t("footerLink")}
                    </a>
                </p>
            </div>
        </div>
    );
}