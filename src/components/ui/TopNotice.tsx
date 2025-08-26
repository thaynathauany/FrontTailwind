"use client";

import { useState } from "react";
import Link from "next/link";

export default function TopNotice() {
    const [open, setOpen] = useState(true);

    if (!open) return null;

    return (
        <div className="bg-orange-light text-white">
            <div className="mx-auto max-w-lg px-4 sm:px-6 py-2 relative">
                {/* botão fechar */}
                <button
                    aria-label="Fechar aviso"
                    onClick={() => setOpen(false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 text-white/90 hover:bg-white/20"
                >
                    ×
                </button>

                <div className="flex flex-col items-center gap-1 text-xs leading-tight text-center
                    sm:flex-row sm:justify-center sm:gap-3 sm:text-sm sm:text-left">
                    <span>Documentação pendente.</span>
                    <Link href="/my-panel?tab=2" className="underline font-medium">
                        Clique aqui para atualizar.
                    </Link>
                </div>
            </div>
        </div>
    );
}