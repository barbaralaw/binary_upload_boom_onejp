const Post = require('../models/Post')

module.exports = {
    getProfile: async (req,res)=>{
        console.log(req.user)
        try{
            const postItems = await Post.find({userId:req.user.id})
            // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('profile.ejs', {post: postItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createPost: async (req, res)=>{
        // console.log("**********" + req.file.filename)
        try{
            await Post.create({post: req.body.post, postBody: req.body.postBody, image: '/uploads/' + req.file.filename, userId: req.user.id})
            console.log('Post has been added!')
            res.redirect('/post')
        }catch(err){
            console.log(err)
        }
    },
    // markComplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // deletePost: async (req, res)=>{
    //     // console.log(req.body.postIdFromJSFile)
    //     try{
    //         await Post.findOneAndDelete({_id:req.body.postIdFromJSFile})
    //         console.log('Deleted Todo')
    //         res.json('Deleted It')
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

    deletePost: async (req, res) => {
        try {
          // Find post by id
          let post = await Post.findById( req.params.id );
          // Delete post from db
          await Post.remove({ _id: req.params.id });
          console.log("Deleted Post");
          res.redirect("/feed");
        } catch (err) {
          res.redirect("/feed");
        }
      },
}    