import Server from './controllers/app.js'
import * as v from './global/var.js'
import express from 'express'

class InitServer {
  #port = v.PORT || 4000
  app: express.Application

  constructor() {
    this.app = new Server().createApp()
  }

  createServer() {
    this.app.listen(this.#port, () => {
      this.listener()
    })
  }

  listener() {
    console.log(`Server listening on PORT: http://localhost:${this.#port}`)
  }
}

new InitServer().createServer()
