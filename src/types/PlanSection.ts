import type { LucideIcon } from "lucide-react"

export interface PlanSection {
  id: string
  icon: LucideIcon
  title: string
  content: string
  color: "pink" | "cyan" | "purple" | "mint" | "rose"
  accepted: boolean
}
