import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from '../features/auth/authSelectors'
import type { JSX } from 'react'

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = useSelector(selectToken)
  return token ? children : <Navigate to="/login" replace />
}
