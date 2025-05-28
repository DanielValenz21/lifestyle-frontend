export type AreaKey =
  | 'professional'
  | 'training'
  | 'hobbies'
  | 'nutrition'
  | 'wellness'

export interface AreaObjectives {
  text: string
  detail: number   // 0-100 (slider)
}

export type ObjectiveForm = Record<AreaKey, AreaObjectives>
