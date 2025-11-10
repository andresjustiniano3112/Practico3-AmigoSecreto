import http from './http'
import type { LoginResponse, RegisterPayload } from '../types/api'

export async function login(email: string, password: string) {
  const { data } = await http.post<LoginResponse>('/auth/login', { email, password })
  return data
}

export async function register(payload: RegisterPayload) {
  const { data } = await http.post('/auth/register', payload)
  return data
}
