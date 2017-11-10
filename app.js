const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app = express();


//models
const subreddit = require('./controllers/subredditRouter');
const post = require('./controllers/postRouter');
//Creating a static folder for static files(css, images)
app.use(express.static(__dirname + '/public'));
//Use body parser to get infromation from forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Added to Update, and Delete
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Setting up database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone');

// Controller for all Subdits
app.use('/r/',subreddit);
//Routes for posts
app.use('/posts/', post);

// Homepage for RedditClone
app.get('/', function(req, res){
	res.render('index');
});
// When user inputs an invalid url
app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

app.listen(3000, function(){
	console.log("running on port 3000");
});
