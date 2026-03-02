interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={`bg-klo-dark border border-klo-slate rounded-xl p-6 ${
        hoverable
          ? "transition-all duration-300 hover:-translate-y-1 hover:border-klo-gold/30 hover:shadow-lg hover:shadow-klo-gold/5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
