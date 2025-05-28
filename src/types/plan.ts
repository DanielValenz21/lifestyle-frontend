import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export type PlanStatus = 'Activo' | 'En progreso' | 'Completado' | 'Pausado'

export interface PlanLite {
  id: string
  title: string
  date: string
  status: PlanStatus
  snippet: string
  sectionsCount: number
}


export interface PlanSection {
  type: ReactNode
  id: string
  icon: LucideIcon
  title: string
  content: string
  color: "pink" | "cyan" | "purple" | "mint" | "rose"
  accepted: boolean
}

export interface PlanFull {
  id:        string
  title:     string
  parameters:any
  sections:  PlanSection[]
}
// src/types/plan.ts
export interface PlanSummary {
  id:       number
  title:    string
  snippet:  string
  date:     string  // e.g. "15 Ene 2024"
  status:   'Activo' | 'En progreso' | 'Completado' | 'Pausado'
}

