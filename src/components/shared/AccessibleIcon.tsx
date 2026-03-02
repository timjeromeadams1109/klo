import type { LucideIcon, LucideProps } from "lucide-react";

interface AccessibleIconProps extends Omit<LucideProps, "ref"> {
  icon: LucideIcon;
  label?: string;
  decorative?: boolean;
}

export default function AccessibleIcon({
  icon: Icon,
  label,
  decorative = false,
  ...props
}: AccessibleIconProps) {
  if (decorative) {
    return <Icon aria-hidden="true" {...props} />;
  }

  return <Icon role="img" aria-label={label} {...props} />;
}
