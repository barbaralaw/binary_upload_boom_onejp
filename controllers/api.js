const Feed = require('../models/Post')
const axios = require('axios')
require("dotenv").config({path: "./config/.env"})

module.exports = {
    getNews: async(req, res)=>{
        try{
            const url = `https://newsapi.org/v2/everything?sources=bbc-news&pageSize=100&apiKey=${process.env.WEBAPIKEY}`
            const {data:{articles}} = await axios.get(url)
            console.log(articles)
            res.json({articles})
        }catch(err){
            console.log(err)
        }
    }
}