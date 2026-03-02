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
      className={`bg-[#011A5E] border border-[#0E3783] rounded-2xl p-8 ${
        hoverable
          ? "transition-all duration-300 hover:-translate-y-2 hover:border-[#68E9FA]/40 hover:shadow-xl hover:shadow-[#68E9FA]/10"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
