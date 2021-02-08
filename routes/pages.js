// pages.js
const express = require('express');
const User = require('../utils/user-utils');
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();

// GET requests
router.get('/', (req, res, next) => {
    var user = req.session.user;
    if(user) {
        res.redirect('/index.ejs');
        return;
    }
    res.render('login.ejs', {});
});

router.get('/index', (req, res) => {
    var user = req.session.user;
    if(user) {
        res.render('index.ejs');
        return;
    }
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login.ejs', {});
});

// POST reqeusts
router.post('/login', (req, res, next) => {
    console.log(req.body);
    user.login(req.body.username, req.body.password, function(result) {
        console.log('login post: '+result)
        if(result) {
            req.session.user = result;
            req.session.opp = 1;
            res.redirect('/index.ejs');
        }else {
            res.send('Username/Password incorrect!');
        }
    });
});

module.exports = router;