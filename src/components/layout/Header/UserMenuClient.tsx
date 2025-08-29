"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

type Labels = {
    profile: string;
    newTransfer: string;
    signOut: string;
};

export default function UserMenuClient({ labels }: { labels: Labels }) {
    const items = [
        { label: labels.profile, href: "/my-panel?tab=2", img: "/images/icones/minha-area.png" },
        { label: labels.newTransfer, href: "/my-panel?tab=1", img: "/images/icones/transferencia.png" },
        { label: labels.signOut, href: "#", img: "/images/icones/sair.png" },
    ];

    return (
        <Menu as="div" className="relative hidden lg:block">
            <MenuButton className="-m-1.5 flex items-center p-1.5 gap-2">
                <p className="text-sm text-black">Renato</p>
                <div
                    className="flex items-center justify-center w-8 h-8 rounded-full"
                    style={{ background: "#B3B3B3", border: "3px solid #E0E0E0" }}
                >
                    <p className="text-white text-sm font-medium">R</p>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-primary" />
            </MenuButton>

            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none border border-[#CBCBCB]">
                <ul className="flex flex-col">
                    {items.map((it) => (
                        <li key={it.href}>
                            <Link
                                href={it.href}
                                className={`flex items-center justify-between gap-2 px-4 py-2 text-sm hover:bg-gray-100 ${it.label === labels.signOut ? "text-orange-600" : "text-black"
                                    }`}
                            >
                                <span className="w-full text-right">{it.label}</span>
                                <Image src={it.img} alt="" width={20} height={20} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </MenuItems>
        </Menu>
    );
}