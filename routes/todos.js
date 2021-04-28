const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" })
const { storage } = require("../middleware/multer");

router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo',upload.single("file"), todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router