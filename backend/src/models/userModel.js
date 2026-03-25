const {pool} = require('../config/db')

const findUserByEmail = async (email) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        return result.rows[0]
    } catch (error) {
        console.error('Error finding user by email', error)
        throw error
    }
}

const createUser = async (user) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [user.name, user.email, user.password_hash]
        )
        return result.rows[0]
    } catch (error) {
        console.error('Error creating user', error)
        throw error
    }
}

module.exports = {findUserByEmail, createUser}