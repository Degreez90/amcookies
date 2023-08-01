import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import mailerRoutes from './routes/mailerRoutes.js'
const PORT = process.env.PORT || 6000

dotenv.config()

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/mailer', mailerRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// Serve Frontend
const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'development') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to AM Cookies' })
  })
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
