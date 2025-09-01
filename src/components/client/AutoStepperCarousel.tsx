"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

type Slide = {
    id: string;
    image: string;
    alt?: string;
};

export default function SignBannerCarousel({
    slides,
    ns,
    intervalMs = 5000,
}: {
    slides: Slide[];
    ns: string;
    intervalMs?: number;
}) {
    const t = useTranslations(ns);
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [playing, setPlaying] = useState(true);
    const raf = useRef<number | null>(null);

    const reduceMotion = useMemo(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
        []
    );

    useEffect(() => {
        const onVis = () => setPlaying(document.visibilityState === "visible");
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    useEffect(() => {
        if (!playing) return;
        if (reduceMotion) {
            const id = setTimeout(
                () => setIndex((i) => (i + 1) % slides.length),
                intervalMs
            );
            return () => clearTimeout(id);
        }

        let start = performance.now();
        const tick = (now: number) => {
            const elapsed = now - start;
            const p = Math.min(1, elapsed / intervalMs);
            setProgress(p);
            if (p >= 1) {
                setIndex((i) => (i + 1) % slides.length);
                start = performance.now();
                setProgress(0);
            }
            raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
        return () => {
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [index, playing, intervalMs, slides.length, reduceMotion]);

    const s = slides[index];

    return (
        <div className="flex items-center justify-center px-0 py-0 sm:px-6 lg:flex-1">
            <Container className="p-0">
                <div
                    className="relative w-full mx-auto lg:mx-0 rounded-md overflow-hidden mb-6"
                    onMouseEnter={() => setPlaying(false)}
                    onMouseLeave={() => setPlaying(true)}
                >
                    <img
                        src={s.image}
                        alt={s.alt ?? ""}
                        className="w-[357px] h-[225px]"
                    />

                    <div className="absolute left-4 right-4 bottom-3 flex items-center gap-3 max-w-[320px] mx-7">
                        {slides.map((_, i) => {
                            const isPast = i < index;
                            const isActive = i === index;
                            const filled = isPast ? 1 : isActive ? progress : 0;

                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        if (i === index) {
                                            setIndex((prev) => (prev + 1) % slides.length);
                                        } else {
                                            setIndex(i);
                                        }
                                        setProgress(0);
                                    }}
                                    aria-label={`Ir para slide ${i + 1}`}
                                    className="relative h-2 flex-1 rounded-full bg-white/30 overflow-hidden"
                                >
                                    <span className="absolute inset-0 rounded-full bg-black/10 mix-blend-soft-light" />
                                    <span
                                        className="absolute left-0 top-0 bottom-0 rounded-full bg-white"
                                        style={{ width: `${filled * 100}%` }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col space-y-2 text-center lg:text-left w-full max-w-sm mx-auto lg:mx-0 px-6.5">
                    <h2 className="w-[270px]text-xl font-bold">{t(`slides.${s.id}.title`)}</h2>
                    <p className="text-base">{t(`slides.${s.id}.subtitle`)}</p>
                </div>
            </Container>
        </div>
    );
}