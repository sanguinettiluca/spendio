import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function MonthlyChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Evolución mensual</h2>
        <p className="text-gray-400 dark:text-gray-500 text-center py-8">No hay datos todavía</p>
      </div>
    )
  }

  const formattedData = data.map(d => ({
    ...d,
    mes: MESES[d.month - 1]
  }))

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Evolución mensual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
          <Legend />
          <Bar dataKey="ingresos" fill="#22c55e" name="Ingresos" />
          <Bar dataKey="gastos" fill="#ef4444" name="Gastos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyChart