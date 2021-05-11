const Post = require("../models/Post");
const path = require("path");
const cloudinary = require("../middleware/cloudinary")

module.exports = {
  getProfile: async (req, res) => {
    // console.log(req.user)
    try {
      const postItems = await Post.find({ userId: req.user.id });
      // const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
      res.render("profile.ejs", { post: postItems, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    console.log(req.file);

    const fileErrors = [];
    if(!req.file || !req.body.post || !req.body.postBody){
      if(!req.file) fileErrors.push({ msg: "Please select an image before adding a post" })
      if(!req.body.post) fileErrors.push({ msg: "Please enter a post title" })
      if(!req.body.postBody) fileErrors.push({ msg: "Please enter post body" })
      req.flash("errors", fileErrors);
      return res.redirect("/login");
    }
    if (req.file.size > 1024 * 1024 * 3)
      fileErrors.push({ msg: "Uploaded file is larger than 3 MB" });

    if (
      !(
        /jpeg|jpg|png|gif/.test(
          path.extname(req.file.originalname).toLowerCase()
        ) && /jpeg|jpg|png|gif/.test(req.file.mimetype)
      )
    )
      fileErrors.push({ msg: "Only jpeg, jpg, png and gif allowed" });

    if (fileErrors.length) {
      req.flash("errors", fileErrors);
      return res.redirect("/login");
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    try {
      await Post.create({
        post: req.body.post,
        postBody: req.body.postBody,
        image: result.secure_url,
        userId: req.user.id,
        cloudinaryId: result.public_id,
      });
      console.log("Post has been added!");
      res.redirect("/post");
    } catch (err) {
      console.log(err);
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
      // await Post.findOneAndDelete({_id:req.body.postIdFromJSFile})
      // Find post by id
      let post = await Post.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/post");
      // res.json('Deleted It')
    } catch (err) {
      console.log(err);
    }
  },

  getPolicy: async (req, res) => {
    try {
      res.render("policy.ejs");
    } catch (err) {
      console.log(err)
    }
  },
};
