import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// Dummy credentials for demo purposes
const DUMMY_CREDENTIALS = {
  username: 'admin',
  password: 'password123'
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on app start
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (username === DUMMY_CREDENTIALS.username && password === DUMMY_CREDENTIALS.password) {
      const userData = { username, loginTime: new Date().toISOString() }
      
      setIsAuthenticated(true)
      setUser(userData)
      
      // Persist to localStorage
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
      
      return { success: true }
    } else {
      return { success: false, error: 'Invalid username or password' }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    
    // Clear localStorage
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 