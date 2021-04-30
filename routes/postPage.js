const express = require('express')
const router = express.Router()
const postPageController = require('../controllers/postPage') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get("/:id", ensureAuth, postPageController.getPostPage);

module.exports = router