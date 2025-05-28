import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import api from '../lib/api'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../app/store'
import { loginSuccess } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { email, password })
      dispatch(loginSuccess(data.token))
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-bg">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        {/* Header pastel */}
        <header className="flex flex-col items-center gap-4 bg-pastelPink/10 px-6 pt-12 pb-8">
          <span className="w-24 h-24 rounded-full bg-gradient-to-br from-pastelPink to-pastelLav flex items-center justify-center shadow-lg">
            <Sparkles className="w-12 h-12 text-white" />
          </span>
          <h1 className="text-3xl font-light text-gray-800 text-center">Plan de Estilo de Vida</h1>
          <p className="text-gray-600 -mt-2">Diseña tu vida ideal con IA</p>
        </header>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-10">
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pastelBlue transition"
          />
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pastelBlue transition"
          />

          {/* Botón primario */}
          <button
            type="submit"
            className="h-12 rounded-xl bg-pastelPink text-gray-800 font-medium hover:bg-pastelLav transition transform hover:scale-[1.02]"
          >
            Iniciar Sesión
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">o</span>
            </div>
          </div>

          {/* Botón secundario */}
          <button
            type="button"
            className="h-12 rounded-xl border border-pastelBlue text-gray-700 hover:bg-pastelBlue/50 transition transform hover:scale-[1.02]"
          >
            Continuar como Invitado
          </button>

          <p className="text-xs text-gray-500 text-center pt-2">
            Al continuar, aceptas nuestros términos y política de privacidad
          </p>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
 