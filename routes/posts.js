const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" })
const { storage } = require("../middleware/multer");

router.get('/', ensureAuth, postsController.getProfile)

router.post('/createPost',upload.single("file"), postsController.createPost)

// router.put('/markComplete', postsController.markComplete)

// router.put('/markIncomplete', postsController.markIncomplete)

router.delete('/deletePost', postsController.deletePost)

module.exports = router