// src/types/modal.ts
export interface FeedbackModalProps {
  open: boolean
  sectionId: number
  sectionTitle: string
  originalContent: string
  onClose: () => void
  onSubmit: (sectionId: number, feedback: string) => void
}
