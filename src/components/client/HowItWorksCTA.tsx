"use client";

import CustomButton from "@/components/ui/CustomButton";

export default function HowItWorksCTA({
    title,
    desc,
    buttonLabel,
    onClick,
}: {
    title: string;
    desc: string;
    buttonLabel: string;
    onClick?: () => void;
}) {
    return (
        <div className="text-center bg-white p-4 py-12">
            <h3 className="text-2xl sm:text-4xl font-bold text-secondary mb-6">{title}</h3>
            <p className="text-primary font-normal mb-6 mt-2">{desc}</p>
            <CustomButton text={buttonLabel} onClick={onClick ?? (() => { })} />
        </div>
    );
}