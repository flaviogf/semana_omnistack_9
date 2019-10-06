/* eslint no-console: "off" */

const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')

mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-vdxmr.azure.mongodb.net/omnistack-semana-9?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const app = express()

app.use(express.json())

app.use(routes)

app.listen(3000, () => console.log('Is running on port 3000'))
