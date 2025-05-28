import React from 'react'
import { ThumbsUp, Edit, CheckCircle } from 'lucide-react'
import type { PlanSection } from '../../types/plan'

interface Props {
  section: PlanSection
  onAccept: (id: string) => void
  onEdit:   (sec: PlanSection) => void
  index:    number            // para delay animación
}

const SectionCard: React.FC<Props> = ({ section, onAccept, onEdit, index }) => (
  <article
    className={`rounded-2xl shadow-md hover:shadow-lg transition hover:scale-[1.02]
                ${section.color} p-6 animate-in fade-in slide-in-from-bottom-4`}
    style={{ animationDelay: `${index * 120}ms` }}
  >
    <header className="flex justify-between mb-4">
      <h3 className="text-lg font-medium text-gray-800">{section.type}</h3>
      {section.accepted && <CheckCircle className="w-6 h-6 text-green-600" />}
    </header>

    <div className="bg-white/60 rounded-xl p-4 mb-6 max-h-40 overflow-y-auto">
      <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">{section.content}</pre>
    </div>

    <div className="flex gap-3">
      <button
        disabled={section.accepted}
        onClick={() => onAccept(section.id)}
        className={`flex-1 rounded-xl h-10 flex items-center justify-center gap-2 transition
          ${section.accepted
            ? 'bg-green-100 text-green-700 cursor-default'
            : 'bg-white/70 hover:bg-white text-gray-800'}`}
      >
        <ThumbsUp className="w-4 h-4" /> {section.accepted ? 'Aceptado' : 'Aceptar'}
      </button>

      <button
        onClick={() => onEdit(section)}
        className="flex-1 rounded-xl h-10 flex items-center justify-center gap-2
                   bg-white/50 hover:bg-white/70 border border-white/50 transition"
      >
        <Edit className="w-4 h-4" /> Editar
      </button>
    </div>
  </article>
)

const MainPage = () => {
  return (
    <main className="max-w-7xl mx-auto grid gap-6 px-4 pb-28 lg:grid-cols-2">
      {/* Aquí iría el mapeo de las secciones y el uso del componente SectionCard */}
    </main>
  )
}

export default SectionCard
