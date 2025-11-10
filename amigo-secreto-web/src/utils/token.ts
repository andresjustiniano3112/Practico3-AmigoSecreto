const KEY = 'token'

export function saveToken(t: string) { localStorage.setItem(KEY, t) }
export function getToken(): string | null { return localStorage.getItem(KEY) }
export function removeToken() { localStorage.removeItem(KEY) }
export function isLogged(): boolean { return !!getToken() }
