var express = require('express')
var bodyParser = require('body-parser');
const Post = require('../models/post')
var router = express.Router();

//Search post model for specific subreddit
app.get('/n/:subreddit', (req, res) => {
    console.log("--- Subreddit");
    console.log(req.params.subreddit);
    Post.find({ subreddit: req.params.subreddit })
      .populate('author') // Refers to the pointer variable in User database
      .exec(function (err, posts) {
      console.log(posts)
      res.render('posts-index', { posts })
    }).catch((err) => {
      console.log(err)
    })
  });

module.exports = router
