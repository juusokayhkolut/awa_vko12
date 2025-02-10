import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bookRoutes from './routes/bookRoutes'

dotenv.config()
const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    const corsOptions = {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions))
} else if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  const express = require('express')
  app.use(express.static(path.resolve(__dirname, '../../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
  })
}

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err))

app.use('/api/book', bookRoutes)  

const PORT = process.env.PORT || 1234
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
