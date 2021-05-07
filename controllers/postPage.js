const Post = require('../models/Post')

module.exports = {
    getPostPage: async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id)
            // console.log(post.likes)
            res.render('post.ejs', {post: post, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    likePost:  async (req, res) => {
        const post = await Post.findById(req.params.id)
        if(post.likes.includes(req.user.id)){
            try {
                await Post.findOneAndUpdate(
                    { _id: req.params.id},
                    {
                        $pull: { likes: req.user.id },
                    },
                    {
                        new: true,
                    }
                )
                console.log("Likes -1");
                res.redirect(`/postPage/${req.params.id}`);
                
            } catch (err) {
                console.log(err);
            }
        }else if(post.dislikes.includes(req.user.id)){
            try {
                await Post.findOneAndUpdate(
                    { _id: req.params.id},
                    {
                        $pull: { dislikes: req.user.id },
                        $push: { likes: req.user.id },
                    },
                    {
                        new: true,
                    }
                )
                console.log("Likes -1");
                res.redirect(`/postPage/${req.params.id}`);
                
            } catch (err) {
                console.log(err);
            }
        }else{
            try {
                await Post.findOneAndUpdate(
                    { _id: req.params.id},
                    {
                        $push: { likes: req.user.id },
                    },
                    {
                        new: true,
                    }
                )
            console.log("Likes +1");
            res.redirect(`/postPage/${req.params.id}`);
            
            } catch (err) {
                console.log(err);
            }
        }
    },
    dislikePost:  async (req, res) => {
        const post = await Post.findById(req.params.id)
        if(post.dislikes.includes(req.user.id)){
            try {
                await Post.findOneAndUpdate(
                    { _id: req.params.id},
                    {
                        $pull: { dislikes: req.user.id },
                    },
                    {
                        new: true,
                    }
                )
                console.log("dislikes -1");
                res.redirect(`/postPage/${req.params.id}`);
                
            } catch (err) {
                console.log(err);
            }
        }else if(post.likes.includes(req.user.id)){
            try {
                await Post.findOneAndUpdate(
                    { _id: req.params.id},
                    {
                        $pull: { likes: req.user.id },
                        $push: { dislikes: req.user.id }
                    },
                    {
                        new: true,
                    }
                )
                console.log("dislikes -1");
                res.redirect(`/postPage/${req.params.id}`);
                
            } catch (err) {
                console.log(err);
            }
        }else{
            try {
                await Post.findOneAndUpdate(
                    { _id: req.params.id},
                    {
                        $push: { dislikes: req.user.id },
                    },
                    {
                        new: true,
                    }
                )
            console.log("dislikes +1");
            res.redirect(`/postPage/${req.params.id}`);
            
            } catch (err) {
                console.log(err);
            }
        }
    }
}