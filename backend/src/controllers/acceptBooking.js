const Booking = require('../models/booking')

const AcceptBookingController = {
  async store(req, res) {
    const { id } = req.params

    const booking = await Booking.findOne({ _id: id }).populate('spot')

    booking.approved = true

    const requestingUser = req.connectedUsers[booking.user]

    if (requestingUser) {
      req.io.to(requestingUser).emit('booking_response', booking)
    }

    await booking.save()

    return res.status(200).json(booking)
  }
}

module.exports = AcceptBookingController
