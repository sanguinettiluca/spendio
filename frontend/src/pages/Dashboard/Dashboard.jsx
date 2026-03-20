import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getTransactions, deleteTransaction } from '../../services/transactionService'
import TransactionForm from '../../components/TransactionForm'
import CategoryChart from '../../components/CategoryChart'
import MonthlyChart from '../../components/MonthlyChart'
import { getStatsByCategory, getMonthlyStats } from '../../services/statsService'

function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [categoryStats, setCategoryStats] = useState([])
  const [monthlyStats, setMonthlyStats] = useState([])
  const [filters, setFilters] = useState({ startDate: '', endDate: '' })


  useEffect(() => {
    fetchTransactions()
    fetchStats()
  }, [])

  const handleDelete = async (id) => {
    if(!window.confirm('Estás seguro que querés borrar esta transacción?')) return
    try{
      await deleteTransaction(id)
      fetchTransactions()
      fetchStats()
    }catch(error){
      console.error('Error borrando transacción:', error)
    }
  }

  const fetchTransactions = async () => {
    try {
      const params = {}
      if(filters.startDate) params.startDate = filters.startDate
      if(filters.endDate) params.endDate = filters.endDate
      const response = await getTransactions(params)
      setTransactions(response.data)
    } catch (error) {
      console.error('Error cargando transacciones:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const [categoryRes, monthlyRes] = await Promise.all([
          getStatsByCategory(),
          getMonthlyStats()
      ])
      setCategoryStats(categoryRes.data)
      setMonthlyStats(monthlyRes.data)
    } catch (error) {
      console.error('Error cargando stats:', error)
    }
  }

  const totalIngresos = transactions.reduce((total, t) => t.type === 'income' ? total + Number(t.amount) : total, 0)
  const totalGastos = transactions.reduce((total, t) => t.type === 'expense' ? total + Number(t.amount) : total, 0)
  const balance = totalIngresos - totalGastos

  if (loading) return <p>Cargando...</p>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Spendio</h1>
        <button
          onClick={logout}
          className="text-sm text-gray-500 hover:text-red-500 transition"
        >
          Cerrar sesión
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Ingresos</p>
            <p className="text-2xl font-bold text-green-600">${totalIngresos.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Gastos</p>
            <p className="text-2xl font-bold text-red-600">${totalGastos.toFixed(2)}</p>
          </div>
        </div>

        {/* Botón para mostrar el formulario */}
        <div className="mb-6">
          <div className="flex gap-3 mb-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={fetchTransactions}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
            >
              Filtrar
            </button>
            {(filters.startDate || filters.endDate) && (
                <button
                    onClick={() => {
                        setFilters({ startDate: '', endDate: '' })
                        fetchTransactions()
                    }}
                    className="text-sm text-gray-500 hover:text-red-500 transition"
                >
                    Limpiar
                </button>
            )}
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
          >
            {showForm ? '✕ Cancelar' : '+ Nueva transacción'}
          </button>
          {showForm && (
            <div className="mt-4">
              <TransactionForm onTransactionCreated={() => {
                fetchTransactions()
                fetchStats()
                setShowForm(false)
              }} />
            </div>
          )}
          </div>

        {/* Lista de transacciones */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Transacciones</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No hay transacciones todavía</p>
          ) : (
            <ul className="space-y-3">
              {transactions.map(t => (
                <li key={t.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800">{t.description}</p>
                    <p className="text-sm text-gray-400">{t.category_name} · {t.date?.slice(0, 10)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type === 'income' ? '+' : '-'}${Number(t.amount).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-gray-400 hover:text-red-500 transition text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </li>           
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <CategoryChart data={categoryStats} />
          <MonthlyChart data={monthlyStats} />
        </div>

      </div>
    </div>
  )
  
}

export default Dashboard