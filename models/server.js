// Servidor de express
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')
const { Socket } = require('dgram')
const Sockets = require('./sockets')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    // http server
    this.server = http.createServer(this.app)

    // configuracion sockets
    this.io = socketIo(this.server)
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')))
  }

	configSockets() {
		new Sockets(this.io).socketEvents()
	}

  execute() {
    // init middlewares
    this.middlewares()

		// init sockets
		this.configSockets()

    // init server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto: ', this.port)
    })
  }
}

module.exports = Server
