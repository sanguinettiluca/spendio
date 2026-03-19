import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getTransactions } from '../../services/transactionService'

function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions()
      setTransactions(response.data)
    } catch (error) {
      console.error('Error cargando transacciones:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Cerrar sesión</button>
      <p>Transacciones: {transactions.length}</p>
    </div>
  )
}

export default Dashboard