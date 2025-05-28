// src/components/ui/textarea.tsx
import React, { type TextareaHTMLAttributes, forwardRef } from 'react'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => (
    <Textarea
      ref={ref}
      className={`w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring ${className}`}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'
