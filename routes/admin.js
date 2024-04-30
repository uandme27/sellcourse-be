const express = require('express')


const router = express.Router()

const adminControllers = require('../controllers/adminController')


router.get('/product', adminControllers.product)
router.get('/product/editProduct/:id', adminControllers.editProduct)
router.get('/product/addproduct', adminControllers.addProduct)
router.get('/', adminControllers.index)

module.exports = router