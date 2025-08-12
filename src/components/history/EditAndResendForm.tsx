"use client";

import CustomButton from "@/components/ui/CustomButton";
import { fmtBRL } from "../../utils/format";

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

    return (
        <div className="pt-2 flex justify-center">
            <div className="w-full max-w-sm">
                <div className="text-lg sm:text-xl font-semibold text-black mb-4 text-center sm:text-left">
                    Repita esta transferência
                </div>

                {/* Valor a enviar */}
                <div className="mb-4">
                    <label className="block text-primary mb-2 text-sm sm:text-base">Valor a enviar</label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <input
                            defaultValue={initialSend}
                            className="w-full sm:w-[230px] px-4 py-3 border border-gray-300 rounded-md text-primary"
                        />
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-gray-200 overflow-hidden">
                                <img src="/images/flags/flagmexicosaldo.png" alt="MXN" />
                            </span>
                            <span className="text-black font-medium text-base sm:text-xl">MXN</span>
                            <img src="/images/vetores/arrow-down.png" alt="Abrir opções de moeda MXN" />
                        </div>
                    </div>
                </div>

                {/* Valor a receber */}
                <div className="mb-6">
                    <label className="block text-primary mb-2 text-sm sm:text-base">Valor a receber</label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <input
                            defaultValue={initialReceive}
                            className="w-full sm:w-[230px] px-4 py-3 border border-gray-300 rounded-md text-primary"
                        />
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-8 w-8 rounded-full ring-2 ring-gray-200 overflow-hidden">
                                <img src="/images/flags/flagbrasilsaldo.png" alt="BRL" />
                            </span>
                            <span className="text-black font-medium text-base sm:text-xl">BRL</span>
                            <img src="/images/vetores/arrow-down.png" alt="Abrir opções de moeda BRL" />
                        </div>
                    </div>
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
                        <div className="text-primary text-sm sm:text-base">Valor convertido:</div>
                        <div className="text-black font-normal text-base sm:text-lg">
                            10.000,00 <span className="text-primary font-normal text-xs sm:text-sm">MXN</span>
                        </div>

                        <div className="mt-3 text-primary text-sm sm:text-base">Taxas aplicadas:</div>
                        <div className="text-black font-normal text-base sm:text-lg">
                            122,50 <span className="text-primary font-normal text-xs sm:text-sm">MXN</span>
                        </div>

                        <div className="mt-3 text-primary text-sm sm:text-base">Total:</div>
                        <div className="text-black font-normal text-base sm:text-lg">
                            198,10 <span className="text-primary font-normal text-xs sm:text-sm">MXN</span>
                        </div>

                        <hr className="my-4 border-gray-200" />

                        {/* Cabeçalho do limite */}
                        <div className="flex items-center justify-between text-primary text-xs sm:text-sm">
                            <span>Máximo de transferência mês:</span>
                            <span>{fmtBRL(monthlyLimit)}</span>
                        </div>

                        {/* Barra de progresso dinâmica */}
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

                        {/* Linha informativa */}
                        <div className="mt-2 text-xs text-primary">
                            Usado: {fmtBRL(monthlyUsed)} • Restante:{" "}
                            {fmtBRL(Math.max(monthlyLimit - monthlyUsed, 0))} ({Math.round(percent)}%)
                        </div>
                    </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <CustomButton text="Fazer transferência" onClick={onSubmit} />
                    <button
                        type="button"
                        className="text-primary underline underline-offset-2"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}