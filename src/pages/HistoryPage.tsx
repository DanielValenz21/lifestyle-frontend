// src/pages/HistoryPage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, Edit } from 'lucide-react'
import api from '../lib/api'
import type { PlanSummary } from '../types/plan'

export default function HistoryPage() {
  const [plans, setPlans] = useState<PlanSummary[]>([])
  const navigate = useNavigate()    

  useEffect(() => {
    // Carga todos los planes del usuario
    api.get<PlanSummary[]>('/plans')
      .then(res => setPlans(res.data))
      .catch(err => {
        console.error('Error al cargar histórico:', err)
      })
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="w-full px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-light text-gray-800">Histórico de Planes</h1>
            <p className="text-sm text-gray-500">Revisa y retoma tus planes anteriores</p>
          </div>
        </div>
      </header>

      {/* Grid de planes */}
      <main
        className="
          flex-1 px-6 py-8 
          grid gap-6 
          sm:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]"
      >
        {plans.map(plan => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
          >
            {/* Título y estado */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-medium text-gray-800 line-clamp-2">
                {plan.title}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  plan.status === 'Activo'
                    ? 'bg-[#D0EFEA] text-emerald-700'
                    : plan.status === 'En progreso'
                      ? 'bg-[#CCE7E8] text-cyan-700'
                      : plan.status === 'Completado'
                        ? 'bg-[#F2C1D1] text-pink-700'
                        : 'bg-gray-200 text-gray-600'
                }`}
              >
                {plan.status}
              </span>
            </div>

            {/* Snippet */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {plan.snippet}
            </p>

            {/* Fecha y número de secciones (suponiendo siempre 5) */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span className="flex items-center">
                <span className="mr-1">📅</span>
                {plan.date}
              </span>
              <span className="flex items-center">
                <span className="mr-1">🎯</span>
                5 secciones
              </span>
            </div>

            {/* Acciones */}
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => navigate(`/plans/${plan.id}`)}
                className="flex-1 flex items-center justify-center gap-2 h-12
                           bg-white border border-gray-200 rounded-xl 
                           hover:bg-gray-50 transition"
              >
                <Eye className="w-4 h-4 text-gray-700" />
                <span className="text-sm text-gray-700">Ver Plan</span>
              </button>
              <button
                onClick={() => navigate(`/plans/${plan.id}/objectives`)}
                className="flex-1 flex items-center justify-center gap-2 h-12
                           bg-[#E3D4ED] hover:bg-[#D9C7E0] text-gray-800 
                           rounded-xl shadow transition"
              >
                <Edit className="w-4 h-4" />
                <span className="text-sm">Actualizar</span>
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
