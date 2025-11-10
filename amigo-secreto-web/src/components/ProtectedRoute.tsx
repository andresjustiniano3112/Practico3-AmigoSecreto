import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isLogged } from '../utils/token'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation()
  if (!isLogged()) return <Navigate to="/login" state={{ from: location }} replace />
  return <>{children}</>
}
