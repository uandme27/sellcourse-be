const express = require('express')
const router = express.Router()
const loginControllers = require('../controllers/loginController')

router.get('/', loginControllers.getUsers)
router.post('/create', loginControllers.createUser);
router.post('/login', loginControllers.loginUser);

module.exports = router