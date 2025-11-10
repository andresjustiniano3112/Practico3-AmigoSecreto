export type LoginResponse = {
  token: string
  email: string
  nombreCompleto: string
}

export type RegisterPayload = {
  email: string
  password: string
  nombreCompleto: string
}

export type Sorteo = {
  id: number
  nombre: string
  fecha: string
  iniciado: boolean
  createdAt: string
  updatedAt: string
}

export type Participante = {
  id: number
  idSorteo: number
  nombre: string
  identificado: boolean
  wishlist?: string | null
  createdAt: string
  updatedAt: string
}

export type SortearResponse = {
  sorteoHash: string
  urlSorteo: string
}

export type PublicPendiente = {
  id: number
  idSorteo: number
  nombre: string
  identificado: boolean
}

export type PublicIdentificarResponse = {
  bolilloHash: string
  urlBolillo: string
}

export type BolilloResponse = {
  yo: { id: number; nombre: string; wishlist: string }
  receptor: { id: number; nombre: string; wishlist: string } | null
}
