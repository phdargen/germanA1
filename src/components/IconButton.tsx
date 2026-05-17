import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
  variant?: "default" | "accent";
};

export function IconButton({
  label,
  children,
  variant = "default",
  className = "",
  ...props
}: IconButtonProps) {
  const variants = {
    default:
      "border-sky-200 bg-white text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:bg-slate-900 dark:text-sky-300 dark:hover:bg-slate-800",
    accent:
      "border-sky-600 bg-sky-600 text-white hover:bg-sky-700 hover:border-sky-700 dark:border-sky-500 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 dark:hover:border-sky-400",
  };

  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-colors active:scale-95 disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
