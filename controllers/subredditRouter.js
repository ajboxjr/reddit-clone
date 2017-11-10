var express = require('express')
var bodyParser = require('body-parser');
var router = express.Router()
//var Product = require('../models/product');

router.get('/new', (req, res) =>{
  res.render('subreddit-new')
  //render a form to input the Title, author, description, admin access
});
module.exports = router
