const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file.filename);
    cb(null, "./public/scorms/")
  },
  filename: (req, file, cb) => {
    console.log(file.filename);
    cb(null, file.originalname)
  },
})

const uploadStorage = multer({ storage: storage, limits: { fileSize: '50mb' }});

function fileFilter (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  cb(null, false)

  // To accept the file pass `true`, like so:
  cb(null, true)

  // You can always pass an error if something goes wrong:
  cb(new Error('I don\'t have a clue!'))

}
module.exports = fileFilter;