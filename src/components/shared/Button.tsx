import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#68E9FA] to-[#37B1FF] text-[#022886] font-bold uppercase tracking-wider rounded-full hover:brightness-110 active:brightness-95 shadow-lg shadow-[#68E9FA]/20",
  secondary:
    "border-2 border-[#68E9FA] text-[#68E9FA] bg-transparent rounded-full uppercase tracking-wider hover:bg-[#68E9FA]/10 active:bg-[#68E9FA]/20",
  ghost:
    "text-white bg-transparent rounded-full uppercase tracking-wider hover:bg-white/5 active:bg-white/10",
  gold:
    "bg-klo-gold text-[#022886] font-bold uppercase tracking-wider rounded-full hover:brightness-110 active:brightness-95 shadow-lg shadow-klo-gold/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-8 py-3.5 text-sm rounded-full",
  lg: "px-10 py-4.5 text-base rounded-full",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className = "",
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#68E9FA] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={combinedStyles}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedStyles} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
