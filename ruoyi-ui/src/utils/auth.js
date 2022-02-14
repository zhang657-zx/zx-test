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
