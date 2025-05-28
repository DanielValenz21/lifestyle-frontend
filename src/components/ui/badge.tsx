// src/components/ui/badge.tsx
import type { HTMLAttributes } from "react";
// Simple cn utility for className concatenation
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual style del badge.
   * - `default`  = gris
   * - `success`  = verde
   * - `info`     = celeste
   * - `warning`  = naranja
   * - `danger`   = rosa
   */
  variant?: "default" | "success" | "info" | "warning" | "danger";
}

export const Badge = ({
  className,
  variant = "default",
  ...props
}: BadgeProps) => {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          default: "bg-gray-200 text-gray-700",
          success: "bg-emerald-100 text-emerald-700",
          info: "bg-sky-100 text-sky-700",
          warning: "bg-amber-100 text-amber-700",
          danger: "bg-rose-100 text-rose-700",
        }[variant],
        className,
      )}
    />
  );
};

export default Badge;
