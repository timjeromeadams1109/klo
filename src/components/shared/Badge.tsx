type BadgeVariant = "gold" | "cyan" | "blue" | "green" | "lime" | "muted" | "purple" | "magenta";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: "bg-klo-gold/15 text-klo-gold border-klo-gold/30",
  cyan: "bg-[#68E9FA]/15 text-[#68E9FA] border-[#68E9FA]/30",
  blue: "bg-[#68E9FA]/15 text-[#68E9FA] border-[#68E9FA]/30",
  green: "bg-[#6ECF55]/15 text-[#6ECF55] border-[#6ECF55]/30",
  lime: "bg-[#6ECF55]/15 text-[#6ECF55] border-[#6ECF55]/30",
  muted: "bg-white/5 text-[#8BA3D4] border-white/10",
  purple: "bg-[#8840FF]/15 text-[#8840FF] border-[#8840FF]/30",
  magenta: "bg-[#F77A81]/15 text-[#F77A81] border-[#F77A81]/30",
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
