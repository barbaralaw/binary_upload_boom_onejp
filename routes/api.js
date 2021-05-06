const express = require('express')
const router = express.Router()
const APIController = require('../controllers/api')

router.get('/getNews', APIController.getNews)

module.exports = router
