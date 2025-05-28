// src/pages/ExportPage.tsx
import React, { useState, useEffect } from 'react'
import { ArrowLeft, Download, Link, Mail } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import type { PlanExport } from '../types/export'
import api from '../lib/api' // tu cliente Axios/fetch

const ExportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const nav     = useNavigate()
  const [data, setData]       = useState<PlanExport | null>(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    // FETCH datos de exportación
    api.get<PlanExport>(`/plans/${id}/export`)
      .then((res: { data: React.SetStateAction<PlanExport | null> }) => setData(res.data))
      .catch(console.error)
  }, [id])

  const handleDownload = () => {
    if (!data) return
    window.open(data.exportUrl, '_blank')
  }

  const handleCopyLink = async () => {
    if (!data) return
    await navigator.clipboard.writeText(data.publicUrl)
    alert('Enlace copiado al portapapeles 🎉')
  }

  const handleEmail = async () => {
    if (!data) return
    setSending(true)
    try {
      await api.post(`/plans/${id}/email`, { url: data.publicUrl })
      alert('Email enviado correctamente ✉️')
    } catch (err) {
      console.error(err)
      alert('Error al enviar email')
    } finally {
      setSending(false)
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-gray-500">Cargando opciones de exportación…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="w-full px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => nav(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-light text-gray-800">Exportar Plan</h1>
            <p className="text-sm text-gray-500">Comparte tu plan de estilo de vida</p>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1 px-6 py-8 max-w-2xl mx-auto space-y-6">
        {/* Descargar PDF */}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 h-14 
                     bg-pastelPink hover:bg-pastelPink/90 text-gray-800 
                     rounded-2xl shadow transition"
        >
          <Download className="w-5 h-5" /> Descargar PDF
        </button>

        {/* Copiar enlace público */}
        <button
          onClick={handleCopyLink}
          className="w-full flex items-center justify-center gap-2 h-14 
                     bg-pastelBlue hover:bg-pastelBlue/90 text-gray-800 
                     rounded-2xl shadow transition"
        >
          <Link className="w-5 h-5" /> Copiar enlace público
        </button>

        {/* Enviar por email */}
        <button
          onClick={handleEmail}
          disabled={sending}
          className={`w-full flex items-center justify-center gap-2 h-14 
                     ${sending ? 'bg-gray-200 cursor-not-allowed' : 'bg-pastelMint hover:bg-pastelMint/90'} 
                     text-gray-800 rounded-2xl shadow transition`}
        >
          <Mail className="w-5 h-5" /> {sending ? 'Enviando…' : 'Enviar por email'}
        </button>
      </main>
    </div>
  )
}

export default ExportPage
