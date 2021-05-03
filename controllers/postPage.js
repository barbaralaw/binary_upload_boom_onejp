const Post = require('../models/Post')

module.exports = {
    getPostPage: async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id)
            res.render('post.ejs', {post: post, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    
    deletePostPage: async (req, res) => {

    }
}