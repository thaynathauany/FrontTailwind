"use client";

import CustomButton from "@/components/ui/CustomButton";

export default function AboutCTA({
    label,
    onClick,
    fullWidth = false
}: {
    label: string;
    onClick?: () => void;
    fullWidth?: boolean;
}) {
    return (
        <CustomButton
            text={label}
            className={fullWidth ? "w-full mt-4" : ""}
            onClick={onClick ?? (() => { })}
        />
    );
}