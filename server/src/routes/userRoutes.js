const express = require('express')
const router = express.Router()
const {register,login,userDashboard}= require('../controlllers/userController')
const { auth } = require('../middleware/auth')


router.post('/register',register)
router.post('/login',login)
router.get('/userDashboard',auth ,userDashboard)


module.exports = router