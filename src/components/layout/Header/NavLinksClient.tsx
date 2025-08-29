"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

export default function NavLinksClient({ items }: { items: NavItem[] }) {
    const pathname = usePathname();
    return (
        <>
            {items.map((it) => {
                const active = pathname === it.href;
                return (
                    <Link
                        key={it.href}
                        href={it.href}
                        aria-current={active ? "page" : undefined}
                        className={`text-base ${active ? "text-secondary font-bold" : "text-primary font-medium"} hover:text-secondary`}
                    >
                        {it.label}
                    </Link>
                );
            })}
        </>
    );
}