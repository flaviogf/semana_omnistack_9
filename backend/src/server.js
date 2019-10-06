/* eslint no-console: "off" */

const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-vdxmr.azure.mongodb.net/omnistack-semana-9?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const app = express()

app.use(cors())

app.use(express.json())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(routes)

app.listen(3333, () => console.log('Is running on port 3000'))
