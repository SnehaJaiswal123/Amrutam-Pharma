const express = require('express')
const User = require('../Controller/usercontroller')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users',User.signup)

router.post('/users/login', User.login)

router.post('/users/logout', auth, User.logout)

router.post('/users/logoutAll', auth, User.logoutAll)

router.patch('/users/me', auth,User.updateuser)

router.delete('/users/me', auth, User.deleteuser)


module.exports = router