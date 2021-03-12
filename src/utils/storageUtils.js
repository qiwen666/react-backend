
const USER_KEY = 'user_key'
const TOKEN_KEY = 'token_key'

export default {
  saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY))
  },

  removeUser() {
    return localStorage.removeItem(USER_KEY)
  },

  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
  },

  getToken() {
    return JSON.parse(localStorage.getItem(TOKEN_KEY))
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  }
}