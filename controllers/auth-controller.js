const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/user');

// Get Signup form
router.get('/sign-up', (req, res) => {
	res.render('signup');
});

//Post usrname and pswrd to database
router.post('/sign-up', (req , res) => {
    const user = new User(req.body);
		console.log(user);

    user.save().then((user) => {
			var token  = jwt.sign({ _id: user._id }, process.env.SECRET, {expiresIn:"30 days"});
			res.cookie('nToken', token, {maxAge:900000, httpOnly:true});
			console.log(token);
      res.redirect('/');

    }).catch((err) => {
      console.log(err.message);
			return res.status(400).send({err:err})
    });
});

// Get login info
router.get('/login', (req,res) => {
	res.render('login');
});

// Post info into login
router.post('/login', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  // Find this user name
  User.findOne({ username }, 'username password').then((user) => {
    if (!user) {
      // User not found
      return res.render('login', {message: 'Wrong Username or Password' });
    }
    // Check the password
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch) {
        // Password does not match
        return res.render('login', {message: 'Wrong Username or Password' });
      }
			console.log('the password is correct!')
      // Create a token
      const token = jwt.sign(
        { _id: user._id, username: user.username }, process.env.SECRET,
        { expiresIn: "60 days" }
      );
      // Set a cookie and redirect to root
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
			//Console log logged in if logged in
			console.log('sucessfully logged in')
      res.redirect('/');
    });
  }).catch((err) => {
    console.log(err);
  });
});

//Logout remove cookie from browser
router.get('/logout', (req,res)=>{
	res.clearCookie('nToken');
	res.redirect('/');
});


module.exports = router
