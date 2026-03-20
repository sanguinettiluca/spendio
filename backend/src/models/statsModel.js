const sql = require('mssql')

async function getStatsByCategory(userId){
    try{
        const pool = await sql.connect()
        const result = await pool.request()
        .input('userId', sql.Int, userId)
        .query(`SELECT c.name, c.color, SUM(t.amount) AS total
            FROM transactions t
            JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = @userId AND t.type = 'expense'
            GROUP BY c.name, c.color`)
        return result.recordset
    }catch(error){
        console.error('Error obteniendo stats por categoria', error)
        throw error
    }
}

async function getMonthlyStats(userId){
    try{
        const pool = await sql.connect()
        const result = await pool.request()
        .input('userId', sql.Int, userId)
        .query(`SELECT
            MONTH(date) as month,
            YEAR(date) as year,
            SUM(CASE WHEN type= 'income' THEN amount ELSE 0 END) as ingresos,
            SUM(CASE WHEN type= 'expense' THEN amount ELSE 0 END) as gastos
            FROM transactions
            WHERE user_id = @userId
            GROUP BY YEAR(date), MONTH(date)
            ORDER BY year, month`)
        return result.recordset
    }catch(error){
        console.error('Error obteniendo stats mensuales', error)
        throw error
    }
}

module.exports = {getStatsByCategory, getMonthlyStats}