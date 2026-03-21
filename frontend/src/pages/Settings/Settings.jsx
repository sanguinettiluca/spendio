import { useState, useEffect, use } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategories, createCategory, deleteCategory } from '../../services/categoryService'

function Settings() {
    const [categories, setCategories] = useState([])
    const [form, setForm] = useState({
        name: '',
        color: '#3B82F6',
        icon: '',
        type: 'expense'
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async() => {
        try{
            const response = await getCategories()
            setCategories(response.data)
        }catch (error){
            console.error('Error cargando categorías:', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try{
            await createCategory(form)
            setForm({
                name: '',
                color: '#3B82F6',
                icon: '',
                type: 'expense'
            })
            fetchCategories()
        }catch(error){
            setError('Error al crear la categoría')
        }finally{
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if(!window.confirm('¿Eliminar esta categoría?')) return
        try{
            await deleteCategory(id)
            fetchCategories()
        }catch(error){
            console.error('Error al eliminar categoría:', error)
        }
    }

    return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Spendio</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-gray-500 hover:text-blue-500 transition"
        >
          ← Volver al dashboard
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Configuración</h2>

        {/* Gestión de categorías */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h3>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Gimnasio"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="expense">Gasto</option>
                  <option value="income">Ingreso</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input
                  type="color"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ícono (texto)</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: 🏋️"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 text-sm"
            >
              {loading ? 'Guardando...' : '+ Agregar categoría'}
            </button>
          </form>

          {/* Lista de categorías */}
          <ul className="space-y-2">
            {categories.map(c => (
              <li key={c.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color || '#ccc' }} />
                  <span className="text-sm font-medium text-gray-800">{c.icon} {c.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {c.type === 'income' ? 'Ingreso' : 'Gasto'}
                  </span>
                </div>
                {c.user_id && (
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-gray-400 hover:text-red-500 transition text-sm"
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Settings