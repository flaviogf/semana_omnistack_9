const Spot = require('../models/spot')

const DashboardController = {
  async show(req, res) {
    const { user } = req.headers

    const spots = await Spot.find({ user })

    return res.status(200).json(spots)
  }
}

module.exports = DashboardController
