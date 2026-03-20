require('dotenv').config() //dotenv.config() lee el archivo .env y carga las variables en process.env. 
// Si otros módulos se cargan antes, intentan leer process.env.JWT_SECRET o process.env.DB_PASSWORD y encuentran undefined.
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const statsRoutes = require('./routes/statsRoutes')
const app = express()


app.use(cors({ origin: 'http://localhost:5173' })) // Permite solicitudes desde el frontend en localhost:5173,
//  evitando errores de CORS. Esto es necesario para que el frontend pueda comunicarse con el backend
//  sin problemas de seguridad.

app.use(express.json())

app.use('/api/transactions', transactionRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/auth', authRoutes)

app.use('/api/stats', statsRoutes)

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