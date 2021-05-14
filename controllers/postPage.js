const Post = require('../models/Post')
const User = require('../models/User')

module.exports = {
    getPostPage: async (req,res)=>{
        try{
            const post = await Post.findById(req.params.id)
            const userN = await User.findById(post.userId)
            // console.log(userN)
            res.render('post.ejs', {post: post, user: req.user, creator: userN})
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
    },
    comment : async(req, res) => {
        try {
            // console.log(req.user, req.body.commentBody)
            await Post.findOneAndUpdate(
                { _id: req.params.id},
                {
                    $push: { comments: req.user.userName + ': ' + req.body.commentBody},
                },
                {
                    new: true,
                }
            )
        console.log("Comment Added");
        res.redirect(`/postPage/${req.params.id}`);
        
        } catch (err) {
            console.log(err);
        }
    }
}