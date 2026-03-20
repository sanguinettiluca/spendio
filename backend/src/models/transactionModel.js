const sql = require('mssql')

async function getTransactions(userId, filters = {}) {
    try {
        const pool = await sql.connect()
        const result = await pool.request().input('userId', sql.Int, userId)

        let query = `SELECT t.*, c.name AS category_name, c.color, c.icon
            FROM transactions t
            JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = @userId`
        
        if (filters.startDate) {
            query += ' AND t.date >= @startDate'
            result.input('startDate', sql.Date, filters.startDate)
        }
        if (filters.endDate) {
            query += ' AND t.date <= @endDate'
            result.input('endDate', sql.Date, filters.endDate)
        }

        query += ' ORDER BY t.date DESC'

        const finalResult = await result.query(query)
        return finalResult.recordset
    } catch (error) {
        console.error('Error obteniendo transacciones', error)
        throw error;
    }
}

async function createTransaction(userId, categoryId, amount, type, description, date){
    try{
        const pool = await sql.connect()
        const result = await pool.request()
        .input('userId', sql.Int, userId)
        .input('categoryId', sql.Int, categoryId)
        .input('amount', sql.Decimal(18, 2), amount)
        .input('type', sql.VarChar, type)
        .input('description', sql.VarChar, description)
        .input('date', sql.DateTime, date)
        .query(`INSERT INTO transactions (user_id, category_id, amount, type, description, date)
            VALUES (@userId, @categoryId, @amount, @type, @description, @date)`)
        return result.rowsAffected[0]
    }catch(error){
        console.error('Error creando transaccion', error)
        throw error
    }
}

async function updateTransaction(id, userId, categoryId, amount, type, description, date){
    try{
        const pool = await sql.connect()
        const result = await pool.request()
        .input('id', sql.Int, id)
        .input('userId', sql.Int, userId)
        .input('categoryId', sql.Int, categoryId)
        .input('amount', sql.Decimal(18, 2), amount)
        .input('type', sql.VarChar, type)
        .input('description', sql.VarChar, description)
        .input('date', sql.Date, date)
        .query(`UPDATE transactions 
            SET category_id = @categoryId, amount = @amount, type = @type, description = @description, date = @date
            WHERE id = @id AND user_id = @userId`)
        return result.rowsAffected[0]
    }catch(error){
        console.error('Error actualizando transaccion', error)
        throw error
    }
}

async function deleteTransaction(id, userId){
    try{
        const pool = await sql.connect()
        const result = await pool.request()
        .input('id', sql.Int, id)
        .input('userId', sql.Int, userId)
        .query('DELETE FROM transactions WHERE id = @id AND user_id = @userId')
        return result.rowsAffected[0]
    }catch(error){
        console.error('Error borrando transaccion', error)
        throw error
    }
}

module.exports = {getTransactions, createTransaction, updateTransaction, deleteTransaction}