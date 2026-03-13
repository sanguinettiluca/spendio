const sql = require('mssql')

async function getCategories(userId) {
    try {
        const pool = await sql.connect()
        const result = await pool.request()
        .input('userId', sql.Int, userId)
        .query('SELECT * FROM categories WHERE user_id = @userId OR user_id IS NULL')
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

async function createCategory(userId, name, color, icon, type){
    try{
        const pool = await sql.connect()
        const result = await pool.request()
        .input('userId', sql.Int, userId)
        .input('name', sql.VarChar, name)
        .input('color', sql.VarChar, color)
        .input('icon', sql.VarChar, icon)
        .input('type', sql.VarChar, type)
        .query(`INSERT INTO categories (user_id, name, color, icon, type) 
            VALUES (@userId, @name, @color, @icon, @type)`)
        return result.rowsAffected[0]  
    }catch(error){
        console.error('Error creando categoria', error)
        throw error
    }
}

async function deleteCategory(id, userId) {
    try{
        const pool = await sql.connect()
        const result = await pool.request()
        .input('id', sql.Int, id)
        .input('userId', sql.Int, userId)
        .query('DELETE FROM categories WHERE id = @id AND user_id = @userId')
        return result.rowsAffected[0]
    }catch(error){
        console.error('Error borrando categoria', error)
        throw error
    }
}

module.exports = {getCategories, createCategory, deleteCategory}