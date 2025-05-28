import React from 'react'
import { Calendar, Eye, Target } from 'lucide-react'
import type { PlanLite } from '../../types/plan'

interface Props {
  plan: PlanLite
  onView: (id: string) => void
}

const badgeColor = (status: PlanLite['status']) => {
  switch (status) {
    case 'Activo':        return 'bg-pastelMint text-emerald-700'
    case 'En progreso':   return 'bg-pastelBlue text-cyan-700'
    case 'Completado':    return 'bg-pastelPink text-pink-700'
    default:              return 'bg-gray-200 text-gray-600'
  }
}

const PlanCard: React.FC<Props> = ({ plan, onView }) => (
  <article className="rounded-2xl shadow-md border border-transparent hover:shadow-lg hover:scale-[1.02] transition p-6 bg-white">
    <header className="flex justify-between items-start mb-3">
      <h3 className="font-medium text-gray-800 leading-snug">{plan.title}</h3>
      <span className={`px-3 py-0.5 rounded-full text-xs font-medium ${badgeColor(plan.status)}`}>
        {plan.status}
      </span>
    </header>

    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{plan.snippet}</p>

    <div className="flex justify-between text-xs text-gray-500 mb-4">
      <span className="flex items-center gap-1">
        <Calendar className="w-4 h-4" /> {plan.date}
      </span>
      <span className="flex items-center gap-1">
        <Target className="w-4 h-4" /> {plan.sectionsCount} secciones
      </span>
    </div>

    <button
      onClick={() => onView(plan.id)}
      className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
    >
      <Eye className="w-4 h-4" />
      Ver Plan
    </button>
  </article>
)

export default PlanCard
