"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function AuthHeader() {
    return (
        <div className="w-full h-[72px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link href="/">
                <img
                    src="/images/logos/logo-2.png"
                    alt="Logotipo da Dinero"
                    className="cursor-pointer"
                />
            </Link>
            <LanguageSwitcher />
        </div>
    );
}