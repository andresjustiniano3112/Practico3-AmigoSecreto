import http from './http'
import type { PublicPendiente, PublicIdentificarResponse, BolilloResponse } from '../types/api'

export async function getPendientes(sorteoHash: string) {
  const { data } = await http.get<PublicPendiente[]>(`/public/sorteos/${sorteoHash}`)
  return data
}

export async function identificar(sorteoHash: string, idParticipante: number) {
  const { data } = await http.post<PublicIdentificarResponse>(`/public/sorteos/${sorteoHash}/identificar`, {
    idParticipante
  })
  return data
}

export async function getBolillo(bolilloHash: string) {
  const { data } = await http.get<BolilloResponse>(`/public/bolillo/${bolilloHash}`)
  return data
}

export async function saveWishlist(bolilloHash: string, wishlist: string) {
  await http.post(`/public/bolillo/${bolilloHash}/wishlist`, { wishlist })
}
