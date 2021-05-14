const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  postBody:{
    type: String,
    required: true,
  }
  ,
  likes:
    [{type: ObjectId, ref:"User"}]  
  ,
  dislikes: [{type: ObjectId, ref:"User"}]  
  ,
  comments:
    [{type: String, ref:"User"}]
  ,
  userId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('Post', PostSchema)
