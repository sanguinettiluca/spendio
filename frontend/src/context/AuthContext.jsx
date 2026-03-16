import { createContext, useState, useContext } from 'react'

// Crea el contexto — es el "contenedor" global que otros componentes van a consumir
const AuthContext = createContext()

// Provider — envuelve la app y hace que sus valores estén disponibles en todos los componentes hijos
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  
  // Intenta cargar el token del localStorage al iniciar (por si el usuario ya estaba logueado)
  const [token, setToken] = useState(localStorage.getItem('token'))

  // Se llama cuando el usuario hace login exitoso
  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('token', userToken) // persiste el token para que sobreviva un refresh
  }

  // Se llama cuando el usuario hace logout
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token') // limpia el token del navegador
  }

  // Expone los valores y funciones a todos los componentes hijos
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado — simplifica el consumo del contexto en cualquier componente
// En vez de escribir useContext(AuthContext), escribís useAuth()
export function useAuth() {
  return useContext(AuthContext)
}