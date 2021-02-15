// pages.js
// set up middleware and models
const express = require('express');
const User = require('../models/user');
const Request = require('../models/request');
const Post = require('../models/post')
const router = express.Router();

// initialize model objects
const user = new User();
const request = new Request();
const post = new Post();

// GET requests
router.get('/', (req, res, next) => {
    var user = req.session.user;
    if(user) {
        res.redirect('/index');
        return;
    }
    res.render('login.ejs', {});
});

router.get('/request', (req, res, next) => {
    res.render('request.ejs');
});

router.get('/index', (req, res, next) => {
    var user = req.session.user;
    if(user) {
        var user = JSON.parse(user);
        console.log(user.UserTypeID);
        if(user.UserTypeID == 1) {
            request.list(function(result) {
                console.log('index post admin: '+result)
                var data = JSON.parse(result);
                console.log(data);
                res.render('admin.ejs', {username: user.UserName, data: data});
                
            });
        } else {
            post.list(function (result) {
                console.log('index post home: ' + result)
                var data = JSON.parse(result);
                console.log(data);
                res.render('index.ejs', { username: user.UserName, data: data });

            });
        }
        return;
    }
    res.redirect('/');
});

router.get('/home', (req, res, next) => {
    var user = req.session.user;
    console.log(user);
    if(user) {
        res.render('index.ejs', {username: user.UserName});
        return;
    }
    res.redirect('/');
});

router.get('/admin', (req, res, next) => {
    var user = req.session.user;
    if(user) {
        var user = JSON.parse(user);
        console.log(user.UserTypeID)
        if (user.UserTypeID = 1){
            post.list(function(result) {
                console.log('index post admin: '+result)
                var data = JSON.parse(result);
                console.log(data);
                res.render('admin.ejs', {username: user.UserName, data: data});
                
            });
        }
        else if (user.UserTypeID = 2) {
            res.render('index.ejs', {username: user.UserName});
        }
        else if (user.UserTypeID = 3) {
            res.render('index.ejs', {username: user.UserName});
        }
        else {
            res.redirect('/');  
        }
        return;
    }
    res.redirect('/');    
});

router.get('/login', (req, res, next) => {
    res.render('login.ejs', {});
});

router.get('/logout', (req, res, next) => {
    if(req.session.user) {
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

router.get('/register', (req, res, next) => {
    //TODO
});

// POST reqeusts
router.post('/login', (req, res, next) => {
    console.log(req.body);
    user.login(req.body.username, req.body.password, function(result) {
        console.log('login post: '+result)
        if(result) {
            console.log("session user before: "+req.session.user);
            req.session.user = result;
            console.log('session user after: '+req.session.user);
            req.session.opp = 1;
            console.log(req.session.opp);
            res.redirect('/index');
        }else {
            res.send('Username/Password incorrect!');
        }
    });
});

router.post('/approve', (req, res, next) => {
    console.log(req.body);
    request.approve(req.body.id, function(result){
        console.log('approve post: '+result);
        if(result) {
            res.redirect('/index')
        }
    });
});

router.post('/request', (req, res, next) => {
    var mail = req.body.email;
    var name = req.body.name;
    request.create(name, mail, function(result){
        console.log('request post: '+result);
        if (result == 1) {
            res.redirect('/');
        }else {
            res.send('account already requested');
        }
    });
});

module.exports = router;