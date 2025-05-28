// src/components/ui/dialog.tsx
import * as DialogPrimitive from '@radix-ui/react-dialog'
import React from 'react'

// El contenedor raíz
export const Dialog = DialogPrimitive.Root
// Botón que abre el modal
export const DialogTrigger = DialogPrimitive.Trigger
// El overlay (fondo oscuro)
export const DialogOverlay = (props: any) => (
  <DialogPrimitive.Overlay
    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
    {...props}
  />
)
// El contenido modal
export const DialogContent: React.FC<DialogPrimitive.DialogContentProps> = ({ className = '', ...props }) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={`fixed top-1/2 left-1/2 max-w-lg w-full bg-white rounded-2xl transform -translate-x-1/2 -translate-y-1/2 shadow-xl ${className}`}
      {...props}
    />
  </DialogPrimitive.Portal>
)
//Header, Title y Close
export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => (
  <div className="px-6 py-4 border-b" {...props} />
)
export const DialogTitle = DialogPrimitive.Title
export const DialogClose = DialogPrimitive.Close
