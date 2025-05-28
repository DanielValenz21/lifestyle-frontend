import React from "react"

interface ProgressProps {
  value: number // 0-100
  className?: string
}

export const Progress: React.FC<ProgressProps> = ({ value, className = "" }) => (
  <div className={`bg-gray-200 rounded-full w-full overflow-hidden ${className}`}>
    <div
      className="h-full bg-pastelBlue rounded-full transition-all duration-300"
      style={{ width: `${value}%`, height: "100%" }}
    />
  </div>
)
