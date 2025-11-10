import http from './http'
import type { Sorteo, Participante, SortearResponse } from '../types/api'

export async function getSorteos() {
  const { data } = await http.get<Sorteo[]>('/sorteos')
  return data
}

export async function createSorteo(payload: { nombre: string; fecha: string }) {
  const { data } = await http.post<Sorteo>('/sorteos', payload)
  return data
}

export async function updateSorteo(id: number, payload: Partial<{ nombre: string; fecha: string }>) {
  const { data } = await http.put<Sorteo>(`/sorteos/${id}`, payload)
  return data
}

export async function deleteSorteo(id: number) {
  await http.delete(`/sorteos/${id}`)
}

export async function getParticipantes(idSorteo: number) {
  const { data } = await http.get<Participante[]>(`/sorteos/${idSorteo}/participantes`)
  return data
}

export async function addParticipante(idSorteo: number, nombre: string) {
  const { data } = await http.post<Participante>(`/sorteos/${idSorteo}/participantes`, { nombre })
  return data
}

export async function sortear(idSorteo: number) {
  const { data } = await http.post<SortearResponse>(`/sorteos/${idSorteo}/sortear`)
  return data
}
