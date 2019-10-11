/* eslint no-console: "off" */

const http = require('http')
const path = require('path')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const socketIO = require('socket.io')
const routes = require('./routes')

mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-vdxmr.azure.mongodb.net/omnistack-semana-9?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const app = express()
const server = http.Server(app)
const io = socketIO(server)

const connectedUsers = {}

io.on('connection', socket => {
  const { user } = socket.handshake.query
  connectedUsers[user] = socket.id
})

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers
  next()
})

app.use(cors())

app.use(express.json())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(routes)

server.listen(3333, () => console.log('Is running on port 3333'))
