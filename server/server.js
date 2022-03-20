import dotenv from 'dotenv'
import path from 'path'
import morgan from 'morgan'
import express from 'express'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import bodyParser from 'body-parser' 
import cors from 'cors'
dotenv.config()

//db connection
connectDB()

const app = express()


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
); // get information from html forms
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use('/api/category', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('Hello')
  })
}

// 404 routing error handler
app.use(notFound)

// custom error handler
app.use(errorHandler)

const PORT = process.env.PORT||5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`)
})
