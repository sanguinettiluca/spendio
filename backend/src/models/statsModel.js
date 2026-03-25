const {pool} = require('../config/db')

async function getStatsByCategory(userId){
    try{
        const result = await pool.query(
            `SELECT c.name, c.color, SUM(t.amount) AS total
            FROM transactions t
            JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = $1 AND t.type = 'expense'
            GROUP BY c.name, c.color`
        , [userId])
        return result.rows
    }catch(error){
        console.error('Error obteniendo stats por categoria', error)
        throw error
    }
}

async function getMonthlyStats(userId){
    try{
        const result = await pool.query(
            `SELECT 
                EXTRACT(MONTH FROM date) AS month,
                EXTRACT(YEAR FROM date) AS year,
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS ingresos,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS gastos
            FROM transactions
            WHERE user_id = $1
            GROUP BY EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date)
            ORDER BY year, month`
        , [userId])
        return result.rows
    }catch(error){
        console.error('Error obteniendo stats mensuales', error)
        throw error
    }
}

module.exports = {getStatsByCategory, getMonthlyStats}