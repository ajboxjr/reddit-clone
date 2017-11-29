const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const router = express.Router()

router.post('/posts/:postId/comments/:commentId/replies/new', (req, res) => {
  /* Save reply to the comment by comment id
  it should also take the author by refrence(id)
  */
  const postId = req.params.postId
  const reply = new Comment(req.body);
  reply.author = req.user._id
  reply.postId = postId
  reply.save().then((reply) => {
    /* Find comment and unshift new comments*/
    return Comment.findById(req.params.commentId)
  }).then((comment) => {
      comment.comments.unshift(reply);
      return comment.save()
  }).then((comment) => {
    res.redirect(`/posts/${postId}`)
  }).catch((err) => {
    console.log(err)
  })
})



module.exports = router
