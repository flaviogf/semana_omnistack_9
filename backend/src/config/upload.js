const path = require('path')
const multer = require('multer')

module.exports = {
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname)
      const name = path.basename(file.originalname, ext)
      cb(null, `${name}-${Date.now()}${ext}`)
    }
  })
}
