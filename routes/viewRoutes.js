const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController')
const authController = require('./../controllers/authController')

router.get('/first', viewsController.getHomePrivate)
// router.get('/', viewsController.getHome)

router.get('/login', viewsController.getLoginForm)
router.get('/signup', viewsController.getSignupForm)
// router.get('/top', viewsController.getTop)
router.get('/bookmarks', viewsController.getBookMarks)
router.get('/about', viewsController.getAbout)

router.get('/me', authController.protect, viewsController.getProfile)

module.exports = router 