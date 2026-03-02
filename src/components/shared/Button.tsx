import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
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
    "bg-klo-gold text-klo-dark font-semibold hover:brightness-110 active:brightness-95 shadow-md hover:shadow-lg",
  secondary:
    "border border-klo-gold text-klo-gold bg-transparent hover:bg-klo-gold/10 active:bg-klo-gold/20",
  ghost:
    "text-klo-text bg-transparent hover:bg-white/5 active:bg-white/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
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
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-klo-gold focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

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
