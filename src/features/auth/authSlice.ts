import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload { userId: number; email: string; exp: number }

interface AuthState {
  token:  string | null
  userId: number | null
  email:  string | null
}

const initialToken = localStorage.getItem('token') ?? null
let initial: AuthState = { token: null, userId: null, email: null }

if (initialToken) {
  const { userId, email } = jwtDecode<JwtPayload>(initialToken)
  initial = { token: initialToken, userId, email }
}

const slice = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      const { userId, email } = jwtDecode<JwtPayload>(action.payload)
      state.token  = action.payload
      state.userId = userId
      state.email  = email
      localStorage.setItem('token', action.payload)
    },
    logout(state) {
      state.token = state.userId = state.email = null
      localStorage.removeItem('token')
    },
  },
})

export const { loginSuccess, logout } = slice.actions
export default slice.reducer
