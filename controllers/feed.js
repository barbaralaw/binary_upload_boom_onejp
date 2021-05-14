const Feed = require('../models/Post')

module.exports = {
    getFeed: async (req,res)=>{
        try{
            // console.log(req.user)
            const posts = await Feed.find()
                .sort({ createdAt: 'desc' })
                .lean()
            // console.log(posts)
            res.render('feed.ejs', {posts: posts, user: req.user})
        }catch(err){
            console.log(err)
        }
    }
}