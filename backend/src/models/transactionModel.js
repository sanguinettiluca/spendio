const {pool} = require('../config/db')

async function getTransactions(userId, filters = {}) {
    try {
        const params = [userId]
        let query = `SELECT t.*, c.name AS category_name, c.color, c.icon
            FROM transactions t
            JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = $1`

        if (filters.startDate) {
            params.push(filters.startDate)
            query += ` AND t.date >= $${params.length}`
        }
        if (filters.endDate) {
            params.push(filters.endDate)
            query += ` AND t.date <= $${params.length}`
        }

        query += ' ORDER BY t.date DESC'

        const result = await pool.query(query, params)
        return result.rows;
    } catch (error) {
        console.error('Error obteniendo transacciones', error)
        throw error;
    }
}

async function createTransaction(userId, categoryId, amount, type, description, date){
    try{
        const result = await pool.query(
            `INSERT INTO transactions (user_id, category_id, amount, type, description, date) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [userId, categoryId, amount, type, description, date]
        )
        return result.rows[0]
    }catch(error){
        console.error('Error creando transaccion', error)
        throw error
    }
}

async function updateTransaction(id, userId, categoryId, amount, type, description, date){
    try{
        const result = await pool.query(
            `UPDATE transactions SET category_id = $1, amount = $2, type = $3, description = $4,
            date = $5 WHERE id = $6 AND user_id = $7 RETURNING *`,
            [categoryId, amount, type, description, date, id, userId]
        )
        return result.rows[0]
    }catch(error){
        console.error('Error actualizando transaccion', error)
        throw error
    }
}

async function deleteTransaction(id, userId){
    try{
        const result = await pool.query(
            `DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *`,
            [id, userId]
        )
        return result.rows[0]
    }catch(error){
        console.error('Error borrando transaccion', error)
        throw error
    }
}

module.exports = {getTransactions, createTransaction, updateTransaction, deleteTransaction}