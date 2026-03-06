require('dotenv').config()
const express = require('express')
const app = express()
const { connectDB } = require('./config/db')

app.get('/api/health', (req, res) => {
    res.json({status: 'ok', message: 'API is running'})
})

connectDB()

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})