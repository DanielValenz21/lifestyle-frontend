import React, { useState } from 'react'
import { Sparkles, Eye, EyeOff } from 'lucide-react'
import api from '../lib/api'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../app/store'
import { loginSuccess } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const validateForm = () => {
    if (!email) {
      setError('El correo electrónico es requerido')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor ingrese un correo electrónico válido')
      return false
    }
    if (!password) {
      setError('La contraseña es requerida')
      return false
    }
    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) return

    try {
      const { data } = await api.post('/auth/login', { email, password })
      dispatch(loginSuccess(data.token))
      navigate('/')
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('Correo electrónico o contraseña incorrectos')
      } else {
        setError('Error al iniciar sesión. Por favor intente nuevamente.')
      }
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
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              setError('')
            }}
            placeholder="Correo electrónico"
            className={`h-12 px-4 rounded-xl border ${error && !email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-pastelBlue transition`}
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Contraseña"
              className={`h-12 w-full px-4 rounded-xl border ${error && !password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-pastelBlue transition`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm -mt-2">{error}</p>
          )}

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
