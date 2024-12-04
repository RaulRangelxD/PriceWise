import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { authRouter, otpsRouter, usersRouter } from './routes/index.js'
import { createTables, deleteTables } from './config/database.js'

dotenv.config()

const app = express()

const origins = process.env.ORIGINS || [`http://localhost:${process.env.PORT}`, `http://localhost:3000`]
app.use(morgan('dev'))
app.use(express.json())
app.use(
  cors({
    origin: origins,
    credentials: true,
  })
)
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/otps', otpsRouter)

createTables()

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server listening on PORT: http://localhost:${port}`)
})

export default app
