const Spot = require('../models/spot')

const SpotController = {
  async index(req, res) {
    const { tech } = req.query

    const spots = await Spot.find({ techs: tech })

    return res.status(200).json(spots)
  },
  async store(req, res) {
    function trim(text) {
      return text.trim()
    }

    const { filename: thumbnail } = req.file
    const { company, price, techs } = req.body
    const { user } = req.headers

    const spot = await Spot.create({
      thumbnail,
      company,
      price,
      techs: techs.split(',').map(trim),
      user
    })

    return res.status(201).json(spot)
  }
}

module.exports = SpotController
