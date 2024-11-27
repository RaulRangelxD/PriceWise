import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import * as v from '../global/var.js'
import routes from '../routes/index.js'
import { createTables, deleteTables } from '../config/database.js'

dotenv.config()

class Server {
  #origins = v.ORIGINS || [`http://localhost:${v.PORT}`, `http://localhost:3000`]
  #server = express()

  constructor() {
    this.setMiddlewares()
    this.setRoutes()
    this.initializeDatabase()
  }

  setMiddlewares() {
    this.#server.use(morgan('dev'))
    this.#server.use(express.json())
    this.#server.use(
      cors({
        origin: this.#origins,
        credentials: true,
      })
    )
    this.#server.use(cookieParser())
  }

  setRoutes() {
    this.#server.get('/', (req, res) => {
      res.send('Hello World!')
    })
    this.#server.use('/auth', routes.authRoutes)
    this.#server.use('/users', routes.usersRoutes)
    this.#server.use('/otps', routes.otpRoutes)
  }

  initializeDatabase() {
    // deleteTables(); // Uncomment if needed
    createTables()
  }

  createApp() {
    return this.#server
  }
}

export default Server
