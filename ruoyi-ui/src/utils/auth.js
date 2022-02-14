const TokenKey = 'Token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getItem(item) {
  return localStorage.getItem(item)
}

export function setItem(item, value) {
  return localStorage.setItem(item, value)
}

export function removeItem(item) {
  return localStorage.removeItem(item)
}
