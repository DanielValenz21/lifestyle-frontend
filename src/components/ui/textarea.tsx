// src/components/ui/textarea.tsx
import React, {
  forwardRef,
  type TextareaHTMLAttributes,
} from "react";

// pequeña utilidad opcional (si ya la tienes en utils, úsala)
const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ");

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "", ...props }, ref) => (
  <textarea                                    
    ref={ref}
    className={cn(
      "w-full p-3 border border-gray-200 rounded-xl resize-none",
      "focus:outline-none focus:ring-2 focus:ring-pastelBlue/60",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
