var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var User = require('../models/user');

// GEt login info
router.get('/login', (req,res)=>{
	res.render('login');
})

// Post info into login
router.post('/login', (req,res) =>{
	const user = new User(req.body);
	user.save((err)=>{
		if (err) return console.log(err);
		console.log('saved sucessfull');
		res.redirect('/');
	})
});
router.get('/signup', (req, res)=>{
	res.render('signup')
});



module.exports = router;
