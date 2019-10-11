const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')

const AcceptBookingController = require('./controllers/acceptBooking')
const BookingController = require('./controllers/booking')
const DashboardController = require('./controllers/dashboard')
const RejectBookingController = require('./controllers/rejectBooking')
const SessionController = require('./controllers/session')
const SpotController = require('./controllers/spot')

const routes = express.Router()

const upload = multer(uploadConfig)

routes.post('/booking', BookingController.store)

routes.post('/booking/:id/accept', AcceptBookingController.store)
routes.post('/booking/:id/reject', RejectBookingController.store)

routes.get('/dashboard', DashboardController.show)

routes.post('/session', SessionController.store)

routes.get('/spot', SpotController.index)
routes.post('/spot', upload.single('thumbnail'), SpotController.store)

module.exports = routes
