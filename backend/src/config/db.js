require('dotenv').config()
const mssql = require('mssql')

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    }
}

async function connectDB() {
    try {
        const resultado = await mssql.connect(config)
        console.log('Connected to the database')
    } catch (error) {
        console.error('Error connecting to the database', error)
    }
}

module.exports = {connectDB}