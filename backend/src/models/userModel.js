const sql = require('mssql')

const findUserByEmail = async (email) => {
    try {
        const pool = await sql.connect()
        const user = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM users WHERE email = @email')
        return user.recordset[0]
    } catch (error) {
        console.error('Error finding user by email', error)
        throw error
    }
}

const createUser = async (user) => {
    try {
        const pool = await sql.connect()
        const result = await pool.request()
        .input('name', sql.VarChar, user.name)
        .input('email', sql.VarChar, user.email)
        .input('password_hash', sql.VarChar, user.password_hash)
        .query('INSERT INTO users (name, email, password_hash) VALUES (@name, @email, @password_hash)')
        return result.rowsAffected[0]
    } catch (error) {
        console.error('Error creating user', error)
        throw error
    }
}

module.exports = {findUserByEmail, createUser}