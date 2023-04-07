import axios from 'axios'
import { IP } from '~/constant'

axios.defaults.withCredentials = true

export async function authenticateToken(): Promise<boolean> {
  try {
    const res = await axios.get(`${IP}/account/authenticate_token`)
    if (res.data.status === 'ok')
      return true
    else
      return false
  }
  catch (_) {
    return false
  }
}

export function setCookie(name: string, value: string, days: number) {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = `${name}=${value};expires=${d.toUTCString()}`
}

export function deleteCookie(name: string) {
  setCookie(name, '', -1)
}
