const User = require('../models/user')

const SessionController = {
  async store(req, res) {
    const { email } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(200).json(existingUser)
    }

    const newUser = await User.create({ email })

    return res.status(201).json(newUser)
  }
}

module.exports = SessionController
