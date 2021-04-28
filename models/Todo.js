const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  postBody:{
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  image: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
