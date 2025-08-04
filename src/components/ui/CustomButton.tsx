interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function CustomButton({
  text,
  onClick,
  className = "",
  type = "button",
}: CustomButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-secondary text-white h-[44px] px-6 rounded-full font-normal ${className}`}
    >
      {text}
    </button>
  );
}