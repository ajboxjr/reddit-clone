require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app = express();


//models
const post = require('./controllers/postRouter');
const login = require('./controllers/auth-controller')
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

//Routes for posts
app.use('/posts/', post);

// Routes for Login
app.use('/', login);

// Homepage for RedditClone
app.get('/', function(req, res){
	res.render('index');
});
app.get('/about', (req, res)=>{
	res.render('about')
})

// When user inputs an invalid url
app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

//Running server on port 3000.
app.listen(3000, function(){
	console.log("running on port 3000");
});
