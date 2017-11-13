var express = require('express');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var router = express.Router();
var User = require('../models/user');

// GEt login info
router.get('/login', (req,res)=>{
	res.render('login');
});

// Post info into login
router.post('/login', (req,res) =>{
	const user = new User(req.body);
	user.save((err)=>{
		if (err) return console.log(err);
		console.log('saved sucessfull');
		res.redirect('/');
	})
});
router.post('/', (req, res)=>{
  // Create User and JWT
  const user = new User(req.body);

  user.save().then((user) => {
    var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
    console.log("Sucessfully saved");
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
    return res.status(400).send({ err: err });
  });
})
router.get('/signup', (req, res)=>{

});

module.exports = router
