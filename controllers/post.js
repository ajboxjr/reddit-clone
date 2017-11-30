const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
var router = express.Router()

//

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
  var post = new Post(req.body)
  post.author = req.user._id
  // const authorId = req.user._id
  // const content = req.body.content
  // const title = req.body.title
  // const subreddit = req.body.subreddit
  // Post.create({title, content, subreddit, author: authorId
  //   })

  //Creating a post and saving the id to user.
  post.save().then((post) => {
      return User.findById(req.user._id)
    }).then((user) => {
      user.posts.unshift(post)
      user.save()
      console.log("Post Saved");
      return res.redirect(`/posts/${post._id}`);
    }).catch((err) => {
      console.log("Post Error", err);
    });
});

router.get('/posts/:postId', (req, res) => {
  Post.findById({_id: req.params.postId})
  .populate('author')
  .populate({
     path: 'comments',
     populate: {
       path: 'author',
       model: 'User'
     }
    })// Refers to the pointer variable in User database
      .exec(function (err, post) {
        //Post now contains post.author details(username)
        console.log(post)
        res.render('show-post', {post:post, current_user: req.user} );
      });
});

router.post('/posts/:postId/comments', (req, res) => {
  const comment = new Comment(req.body)
  comment.author = req.user._id
  comment.postId = req.params.postId
  comment.save().then((comment) => {
    return Post.findById(req.params.postId)
  }).then((post) => {
    post.comments.unshift(comment)
    return post.save()
  }).then( (post) => {
    res.redirect(`/posts/${post._id}`)
  }).catch((err) => {
    console.log(err)
  })
})
router.get('/posts/:postId/comments', (req, res) => {
  res.send('it works')
})


module.exports = router
