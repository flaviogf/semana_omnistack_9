const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/session')
const SpotController = require('./controllers/spot')
const DashboardController = require('./controllers/dashboard')
const BookingController = require('./controllers/booking')

const routes = express.Router()

const upload = multer(uploadConfig)

routes.post('/session', SessionController.store)

routes.get('/spot', SpotController.index)
routes.post('/spot', upload.single('thumbnail'), SpotController.store)

routes.get('/dashboard', DashboardController.show)

routes.post('/booking', BookingController.store)

module.exports = routes
