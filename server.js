require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app = express();


//controller
const post = require('./controllers/post');
const auth = require('./controllers/auth-controller')
const subreddit = require('./controllers/subreddit')
const replies = require('./controllers/replies')

//models
var Post = require('./models/post');

//Creating a static folder for static files(css, images)
app.use(express.static(__dirname + '/public'));
//Use body parser to get infromation from forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
//Added to Update, and Delete
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Setting up database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone', {useMongoClient: true});

//Middleware

const checkAuth = function(req, res, next){
	if(req.cookies.nToken === undefined || req.cookies.nToken === null){
		req.user = null
	} else {
		var token = req.cookies.nToken
		var decodedToken = jwt.decode(token, {complete: true} || {});
		req.user = decodedToken.payload;
	}
	next();
}
app.use(checkAuth);
//Routes for posts
app.use('/', post);

// Routes for Login
app.use('/', auth);
app.use('/', subreddit)
app.use('/', replies)

// Homepage for RedditClone
app.get('/', (req, res) => {
	Post.find({})
		.populate('author')
		.exec(function (err, posts) {
    	res.render('posts-index',{ current_user: req.user, posts: posts })
  	}).catch((err) =>{
    console.log(err);
  	});
	//})
});
app.get('/about', (req, res) => {
	res.render('about', { current_user: req.user });
})

// When user inputs an invalid url
app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

//Running server on port 3000.
app.listen(3000, () => {
	console.log("running on port 3000");
});
