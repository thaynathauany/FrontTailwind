"use client";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
}

export default function CustomButton({
  text,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  variant = "primary",
  fullWidth = false,
}: CustomButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 h-[44px] font-normal transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const width = fullWidth ? "w-full" : "";
  const variants = {
    primary:
      "bg-secondary text-white hover:opacity-95 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed",
    outline:
      "bg-transparent text-secondary border border-secondary hover:bg-secondary/5 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed",
  } as const;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${width} ${className}`}
    >
      {text}
    </button>
  );
}