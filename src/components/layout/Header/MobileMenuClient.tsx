"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// SVGR icons
import MinhaArea from "@/assets/icones/MinhaArea.svg";
import Dinheiro from "@/assets/icones/Money.svg";
import DadosPessoais from "@/assets/icones/DadosPessoais.svg";
import Historico from "@/assets/icones/Historico.svg";
import Sair from "@/assets/icones/Sair.svg";

type NavItem = { label: string; href: string };
type Labels = {
    signIn: string; signUp: string;
    profile: string; newTransfer: string; personalData: string; history: string; signOut: string;
};

export default function MobileMenuClient({
    navItems, labels
}: { navItems: NavItem[]; labels: Labels }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => setOpen(false), [pathname]);

    const profileItems = [
        { label: labels.profile, href: "/my-panel", Icon: MinhaArea },
        { label: labels.newTransfer, href: "/my-panel?tab=1", Icon: Dinheiro },
        { label: labels.personalData, href: "/my-panel?tab=2", Icon: DadosPessoais },
        { label: labels.history, href: "/my-panel?tab=3", Icon: Historico },
        { label: labels.signOut, href: "#", Icon: Sair, danger: true },
    ];

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="lg:hidden p-3"
                aria-label="Abrir menu"
            >
                <Bars3Icon aria-hidden="true" className="size-5 text-primary" />
            </button>

            <Dialog open={open} onClose={setOpen} className="lg:hidden">
                <div className="fixed inset-0 z-40 bg-black/20" aria-hidden="true" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-8 pb-6 sm:ring-1 sm:ring-gray-900/10">
                    <div className="mx-auto w-full">
                        {/* Topo */}
                        <div className="flex h-16 items-center justify-between mt-4">
                            <Image src="/images/logos/logodinero.jpg" alt="Dinero logo" width={58} height={72} priority />
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="p-2.5 text-primary"
                                aria-label="Fechar menu"
                            >
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="mt-4 flex flex-col items-end space-y-4 text-right">
                            {navItems.map((it) => {
                                const active = pathname === it.href;
                                return (
                                    <Link
                                        key={it.href}
                                        href={it.href}
                                        className={`text-sm sm:text-base font-medium ${active ? "text-secondary" : "text-black"} hover:text-secondary`}
                                        onClick={() => setOpen(false)}
                                    >
                                        {it.label}
                                    </Link>
                                );
                            })}

                            {/* Conta */}
                            <ul className="w-full border-t border-black pt-4 space-y-2">
                                {profileItems.map(({ label, href, Icon, danger }) => (
                                    <li key={href}>
                                        {href === "#" ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    // ex.: signOut();
                                                    setOpen(false);
                                                }}
                                                className="w-full flex items-center justify-end gap-2 px-1 py-2 hover:bg-gray-50 rounded"
                                            >
                                                <span className={`text-sm ${danger ? "text-[#CB5608]" : "text-black"}`}>{label}</span>
                                                <Icon className="w-5 h-5 text-primary" />
                                            </button>
                                        ) : (
                                            <Link
                                                href={href}
                                                className="flex items-center justify-end gap-2 px-1 py-2 hover:bg-gray-50 rounded"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="text-sm text-black">{label}</span>
                                                <Icon className="w-5 h-5 text-primary" />
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Botões auth */}
                            <div className="flex w-full mt-4 gap-2">
                                <Link
                                    href="/sign-in"
                                    className="w-1/2 h-[48px] rounded-[120px] border border-secondary text-secondary font-normal flex items-center justify-center"
                                    onClick={() => setOpen(false)}
                                >
                                    {labels.signIn}
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="w-1/2 h-[48px] rounded-[120px] border border-secondary bg-secondary text-white font-normal flex items-center justify-center"
                                    onClick={() => setOpen(false)}
                                >
                                    {labels.signUp}
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    );
}