require('dotenv').config() //dotenv.config() lee el archivo .env y carga las variables en process.env. 
// Si otros módulos se cargan antes, intentan leer process.env.JWT_SECRET o process.env.DB_PASSWORD y encuentran undefined.
const express = require('express')
const { connectDB } = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const app = express()


app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
    res.json({status: 'ok', message: 'API is running'})
})

const startServer = async () => {
  await connectDB()
  app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
  })
}

startServer()