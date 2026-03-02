type BadgeVariant = "gold" | "blue" | "green" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: "bg-klo-gold/15 text-klo-gold border-klo-gold/30",
  blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  muted: "bg-white/5 text-klo-muted border-white/10",
};

export default function Badge({
  variant = "gold",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
