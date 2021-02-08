// server.js
require('dotenv').config();
var express = require('express');
var path = require('path');
var bcrypt = require('bcrypt');
var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');

// set constants
const app = express();
const initAuthentication = require('./utils/authentication');
const port = 3000;

// intialize app
app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// initialize passport
initAuthentication(passport);

// GET requests
app.get('/', (req, res) => {
    res.render('login.ejs');
})

app.get('/login', (req, res) => {
	res.render('login.ejs');
})

// POST reqeusts
app.post('/sign-in', passport.authenticate('local', {
	successRedirect: '/index',
	failureRedirect: '/login',
	failureFlash: true
  }))


// start server
app.listen(port, () => {
    console.log(`server app listening at http://localhost:${port}`);
  })