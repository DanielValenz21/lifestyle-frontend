import React, { useState } from 'react'
import {
  ArrowLeft, Briefcase, Dumbbell, Book,
  UtensilsCrossed, Heart, Sparkles
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { AreaKey, ObjectiveForm } from '../types/objectives'

/* ───────────────────────── Constants ───────────────────────── */
const AREAS: Record<AreaKey, {
  label: string; icon: any; colorTab: string; placeholder: string
}> = {
  professional: {
    label: 'Profesional',
    icon: Briefcase,
    colorTab: 'bg-pastelPink',
    placeholder: 'Quiero mejorar mis habilidades de liderazgo…'
  },
  training: {
    label: 'Entrenamiento',
    icon: Dumbbell,
    colorTab: 'bg-pastelBlue',
    placeholder: 'Establecer una rutina de ejercicio 4 veces/sem…'
  },
  hobbies: {
    label: 'Hobbies',
    icon: Book,
    colorTab: 'bg-pastelLav',
    placeholder: 'Aprender fotografía digital y leer 2 libros/mes…'
  },
  nutrition: {
    label: 'Nutrición',
    icon: UtensilsCrossed,
    colorTab: 'bg-pastelMint',
    placeholder: 'Adoptar alimentación balanceada y meal-prep…'
  },
  wellness: {
    label: 'Bienestar',
    icon: Heart,
    colorTab: 'bg-pastelPink',
    placeholder: 'Gestionar estrés mediante mindfulness diario…'
  }
}

/* ───────────────────────── Initial state ───────────────────── */
const emptyArea = { text: '', detail: 50 }
const INITIAL_FORM: ObjectiveForm = {
  professional: { ...emptyArea },
  training:     { ...emptyArea },
  hobbies:      { ...emptyArea },
  nutrition:    { ...emptyArea },
  wellness:     { ...emptyArea },
}

/* ───────────────────────── Component ───────────────────────── */
const ObjectivesPage: React.FC = () => {
  const nav = useNavigate()
  const [current, setCurrent] = useState<AreaKey>('professional')
  const [form, setForm]       = useState<ObjectiveForm>(INITIAL_FORM)

  /* helpers */
  const updateArea = (key: AreaKey, data: Partial<{ text: string; detail: number }>) =>
    setForm(prev => ({ ...prev, [key]: { ...prev[key], ...data }}))

  const handleGenerate = () => {
    console.log('payload to IA =>', form)
    // TODO: POST /plans  { title, parameters: form }
    nav('/plans')            // ← redirige cuando tengas id
  }

  /* ───────────────────────── View ──────────────────────────── */
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Top bar */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 py-4">
          <button onClick={() => nav('/plans')} className="p-2 rounded-xl hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-light text-gray-800">Nuevo Plan</h1>
            <p className="text-sm text-gray-500">Define tus objetivos en cada área</p>
          </div>
        </div>
      </header>

      {/* Help card */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-pastelPink/15 to-pastelLav/15">
          <h2 className="font-medium text-gray-800 mb-2">¿Cómo funciona?</h2>
          <p className="text-sm text-gray-600">
            Completa cada sección con tus metas específicas. Nuestra IA creará un plan personalizado
            basado en tus objetivos y el nivel de detalle que indiques.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <nav className="max-w-7xl mx-auto flex overflow-x-auto gap-2 px-4 pb-4">
        {(Object.keys(AREAS) as AreaKey[]).map(key => {
          const { label, icon: Icon, colorTab } = AREAS[key]
          const active = key === current
          return (
            <button
              key={key}
              onClick={() => setCurrent(key)}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm transition
                ${active ? `${colorTab} text-gray-900 shadow` : 'hover:bg-gray-50 text-gray-600'}`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          )
        })}
      </nav>

      {/* Form block */}
      <main className="max-w-4xl mx-auto flex-1 px-4 pb-28">
        {/* textarea */}
        <section className="bg-white rounded-2xl shadow p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe tus objetivos en <span className="font-semibold">{AREAS[current].label}</span>
          </label>
          <textarea
            value={form[current].text}
            placeholder={AREAS[current].placeholder}
            onChange={e => updateArea(current, { text: e.target.value })}
            className="w-full min-h-32 rounded-xl border border-gray-200 p-3
                       focus:outline-none focus:ring-2 focus:ring-pastelBlue resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            Sé específico sobre lo que quieres lograr y en qué timeframe.
          </p>
        </section>

        {/* slider */}
        <section className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            Nivel de detalle deseado: <span className="font-semibold">{form[current].detail}%</span>
          </h3>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={form[current].detail}
            onChange={e => updateArea(current, { detail: +e.target.value })}
            className="w-full h-2 accent-pastelBlue"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Básico</span><span>Detallado</span>
          </div>
        </section>
      </main>

      {/* Floating CTA */}
      <button
        onClick={handleGenerate}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2
                   px-8 py-4 rounded-2xl bg-gradient-to-r from-pastelMint to-pastelBlue
                   text-gray-800 shadow-xl hover:scale-105 transition"
      >
        <Sparkles className="w-5 h-5" /> Generar plan con IA
      </button>
    </div>
  )
}

export default ObjectivesPage
