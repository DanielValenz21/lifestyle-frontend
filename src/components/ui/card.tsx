// src/components/ui/card.tsx
"use client";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div
    className={cn(
      "bg-white rounded-2xl shadow-md overflow-hidden",
      className || ""
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={cn("px-6 pt-6", className || "")} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={cn("px-6 pb-6", className || "")} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h2 className={cn("text-xl font-medium text-gray-800", className || "")} {...props}>
    {children}
  </h2>
);
