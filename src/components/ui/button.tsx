// src/components/ui/button.tsx
import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type RefAttributes,
} from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
          RefAttributes<HTMLButtonElement> {
  /** 
   * Variante de estilo:
   * - "outline": botón con borde y fondo transparente
   * - undefined (default): botón “filled”
   */
  variant?: "outline";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className = "", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center px-4 py-2 font-medium rounded-xl transition-all duration-200";
    const variantClasses =
      variant === "outline"
        ? "bg-transparent border border-gray-200 hover:bg-gray-50"
        : "bg-gray-800 text-white hover:bg-gray-700";

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
