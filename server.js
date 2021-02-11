// server.js
// set up server constants
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');
const app = express();
const port = 3000;

// intialize app
app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
	// set cookie time limit
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

// serve routes
app.use('/', pageRouter);

// 404 error
app.use((req, res, next) =>  {
    var err = new Error('404 ERROR: Page not found');
    err.status = 404;
    next(err);
})

// error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// start server
app.listen(port, () => {
    console.log(`server app listening at http://localhost:${port}`);
  })