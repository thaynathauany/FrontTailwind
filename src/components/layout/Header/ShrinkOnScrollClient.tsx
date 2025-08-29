"use client";

import { useEffect } from "react";

export default function ShrinkOnScrollClient({
    targetId, tallClass, shortClass
}: { targetId: string; tallClass: string; shortClass: string }) {
    useEffect(() => {
        const el = document.getElementById(targetId);
        if (!el) return;
        const onScroll = () => {
            const small = window.scrollY > 10;
            if (small) {
                el.classList.remove(tallClass);
                el.classList.add(shortClass);
            } else {
                el.classList.remove(shortClass);
                el.classList.add(tallClass);
            }
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [targetId, tallClass, shortClass]);

    return null;
}