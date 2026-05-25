import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const VALID_USERNAME = 'admin'
const VALID_PASSWORD = '1234'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const session = sessionStorage.getItem('auth_user')
      return session ? JSON.parse(session) : null
    } catch {
      return null
    }
  })

  const login = useCallback((username, password) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const userData = { username }
      sessionStorage.setItem('auth_user', JSON.stringify(userData))
      setUser(userData)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('auth_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
