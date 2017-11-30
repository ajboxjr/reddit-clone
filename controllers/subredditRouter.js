var express = require('express')
var bodyParser = require('body-parser');
var router = express.Router();

//Search post model for specific subreddit
router.get('r/:subreddit', (req, res)=>{
  Post.find({subreddit: subreddit}).then( ()=>{
})
module.exports = router
