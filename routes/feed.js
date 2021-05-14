const express = require('express')
const router = express.Router()
const feedController = require('../controllers/feed') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const multer = require('multer')
const upload = multer({ dest: "public/uploads/" })
const { storage } = require("../middleware/multer");

router.get('/', ensureAuth,  feedController.getFeed)
router.put('/like/:id', feedController.likePost)
router.put('/dislike/:id', feedController.dislikePost)

module.exports = router