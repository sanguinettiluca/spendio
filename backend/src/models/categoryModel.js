const {pool} = require('../config/db')

async function getCategories(userId) {
    try {
        const result = await pool.query(
            'SELECT * FROM categories WHERE user_id = $1 OR user_id IS NULL',
            [userId]
        )
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function createCategory(userId, name, color, icon, type){
    try{
        const result = await pool.query(
            'INSERT INTO categories (user_id, name, color, icon, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, name, color, icon, type]
        )
        return result.rows[0]
    } catch (error) {
        throw error;
    }
}

async function deleteCategory(id, userId) {
    try{
        const result = await pool.query(
            'DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        )
        return result.rows[0]
    }catch(error){
        console.error('Error borrando categoria', error)
        throw error
    }
}

module.exports = {getCategories, createCategory, deleteCategory}