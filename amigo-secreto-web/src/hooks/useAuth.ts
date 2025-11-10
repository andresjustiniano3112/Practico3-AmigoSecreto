import { useNavigate } from 'react-router-dom'
import { saveToken, removeToken, isLogged } from '../utils/token'
import { login } from '../services/auth'
import { useState } from 'react'

export default function useAuth() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const doLogin = async (email: string, password: string) => {
    setError(null); setLoading(true)
    try {
      const res = await login(email, password)
      saveToken(res.token)
      navigate('/sorteos')
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  const doLogout = () => {
    removeToken()
    navigate('/login')
  }

  return { doLogin, doLogout, isLogged, loading, error }
}
