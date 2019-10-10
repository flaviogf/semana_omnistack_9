const Booking = require('../models/booking')

const BookingController = {
  async store(req, res) {
    const { date, spot } = req.body
    const { user } = req.headers

    const booking = await Booking.create({
      date,
      user,
      spot
    })

    await booking
      .populate('user')
      .populate('spot')
      .execPopulate()

    const onwnerUser = req.connectedUsers[booking.spot.user]

    if (onwnerUser) {
      req.io.to(onwnerUser).emit('request_book', booking)
    }

    return res.status(201).json(booking)
  }
}

module.exports = BookingController
