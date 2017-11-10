const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Post = require('../models/post')
var router = express.Router()

router.get('/', (req, res)=>{
  res.send('TODO Create posts page');
})

router.get('/new', (req, res)=>{
  res.render('post-new');
})


router.post('/new', (req, res)=>{
  var post = new Post(req.body);
  post.save(function(err){
		if (err) return console.log(err);
		console.log('saved sucessfull');
		res.redirect('/');
	});
});

module.exports = router
