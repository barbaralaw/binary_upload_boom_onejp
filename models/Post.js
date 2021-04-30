const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  postBody:{
    type: String,
    required: true
  }
  // ,
  // completed: {
  //   type: Boolean,
  //   required: true,
  // }
  ,
  userId: {
    type: String,
    required: true
  },
  image: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Post', PostSchema)
