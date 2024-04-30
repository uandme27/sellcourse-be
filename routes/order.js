const express = require('express')
// const upload = require('../utils/multer')
const upload = require('../utils/cloudinary')
const router = express.Router()
const orderControllers = require('../controllers/orderControllers')

router.get('/', orderControllers.getOrder);
router.post('/post', orderControllers.createOrder);

module.exports = router