const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Post = require('../models/post')
const User = require('../models/user')
var router = express.Router()

//
router.get('/posts', (req, res) => {
  Post.find({})
    .populate('author')
    .exec(function (err, posts) {
      res.render('posts', { posts: posts });
    }).catch((err) =>{
    console.log(err);
  });
});

//Show create posts forum
router.get('/posts/new', (req, res) => {
  if(req.user){
  res.render('post-new', { current_user: req.user });
}else {
  res.redirect('/')
}
})


router.post('/posts/new', (req, res) => {
  //Save post info as variables
  //Check if the user is logged in
  const current_user = req.user
  if(current_user === null){
    res.redirect('/');
  }
  // Save requests vars and save to posts
  const authorId = req.user._id
  const content = req.body.content
  const title = req.body.title
  const subreddit = req.body.subreddit
  Post.create({title, content, subreddit, author: authorId
    }).then((post) => {
      console.log("Post created");
      return post.save();
    }).then((post) => {
      console.log("Post Saved");
      return res.redirect(`/posts/${post._id}`);
    }).catch((err) => {
      console.log("Post Error", err);
    });
});

router.get('/posts/:id', (req, res) => {
  Post.findById({_id: req.params.id})
      .populate('author') // Refers to the pointer variable in User database
      .exec(function (err, post) {
        //Post now contains post.author details(username)
        res.render('show-post', {post:post});
      });
});

module.exports = router
