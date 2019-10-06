const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/session')
const SpotController = require('./controllers/spot')

const routes = express.Router()

const upload = multer(uploadConfig)

routes.post('/session', SessionController.store)

routes.get('/spot', SpotController.index)
routes.post('/spot', upload.single('thumbnail'), SpotController.store)

module.exports = routes
