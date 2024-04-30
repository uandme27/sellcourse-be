const cloudinary = require('cloudinary').v2;
const path = require('path'); 
const multer = require('multer');


          
cloudinary.config({ 
  cloud_name: 'dzzn0qpi8', 
  api_key: '348592492421392', 
  api_secret: 'JsLPoaf3I81blg16Jy_9g4BvALI',
  timeout: 30000,
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload