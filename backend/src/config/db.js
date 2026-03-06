require('dotenv').config()
const mssql = require('mssql')

const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: false,
    }
}

async function connectDB() {
    try {
        const resultado = await mssql.connect(dbConfig)
        console.log('Connected to the database')
    } catch (error) {
        console.error('Error connecting to the database', error)
    }
}

module.exports = {connectDB}