// pages.js
// set up middleware
const express = require('express');
const router = express.Router();

// set up models
const User = require('../models/user');
const Request = require('../models/request');
const Post = require('../models/post')
const Department = require('../models/department');
const Job = require('../models/job')

// initialize models
const user = new User();
const request = new Request();
const post = new Post();
const deparment = new Department();
const job = new Job();

// GET requests
router.get('/', (req, res, next) => {
    var user = req.session.user;
    if(user) {
        res.redirect('/index');
    }
    res.render('login.ejs', {});
});

router.get('/index', (req, res, next) => {
    var user = req.session.user;
    if (user) {
        var user = JSON.parse(user);
        console.log(user.UserTypeID);
        if (user.UserTypeID = 1) {
            res.redirect('/admin');
        } else if (user.UserTypeID = 3) {
            res.redirect('/home');
        } else {
            res.redirect('/home');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/home', (req, res, next) => {
    var user = req.session.user;
    console.log(user);
    console.log('home get');
    if(user) {
        var user = JSON.parse(user);
        var fullname = user.FirstName + " " + user.LastName;
        console.log(fullname);
        if(user.UserTypeID = 3) {
            console.log('user is manager');
            res.render('home.ejs', { username: fullname })
        } else if (user.UserTypeID = 1) {
            console.log('user is admin')
            res.render('admin.ejs', { username: fullname })
        } else {
            console.log('regular user');
            res.render('home.ejs', {username: user.UserName});
        }
    } else {
        res.redirect('/');
    }
});

router.get('/admin', (req, res, next) => {
    var user = req.session.user;
    if (user) {
        var user = JSON.parse(user);
        console.log(user.UserTypeID)
        if (user.UserTypeID == 1) {
            request.list(function (result) {
                console.log('admin get: ' + result)
                var data = JSON.parse(result);
                console.log(data);
                res.render('admin.ejs', { username: user.UserName, data: data });

            });
        }
        else {
            res.redirect('/home');
        }
    } else {
        res.redirect('/');
    }
});

router.get('/login', (req, res, next) => {
    console.log('login get');
    res.render('login.ejs', {});
});

router.get('/logout', (req, res, next) => {
    console.log('logout get')
    if(req.session.user) {
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

router.get('/request', (req, res, next) => {
    console.log('request get');
    deparment.list(function(result) {
        console.log('department get list: '+result)
        var data = JSON.parse(result);
        console.log(data);
        res.render('request.ejs', {data: data});  
    });
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
    var user = req.session.user;
    if(user) {
        request.approve(req.query.id, function(result){
            console.log('approve post: '+result);
            if(result) {
                res.redirect('/admin');
            }
        });
    } else {
        res.send('access denied');      
    }
});

router.post('/request', (req, res, next) => {
    var mail = req.body.email;
    var dept = req.body.dept;
    var title = req.body.job;
    var fname = req.body.fname;
    var lname = req.body.lname;
    console.log(fname+" "+lname);
    request.create(mail, fname, lname, dept, title, function(result){
        console.log('request post: '+result);
        if (result == 1) {
            res.redirect('/');
        }else {
            res.send('account already requested');
        }
    });
});

router.post('/job-titles', (req, res, next) => {
    var id = req.query.id;
    job.list(id, function(result){
        console.log("job-titles post: "+result);
        res.end(JSON.stringify(result));
    });
});

router.post('/new-request', (req, res, next) => {
    var id = req.query.id;
    request.find(id, function(result){
        console.log("new-request post: "+result);
        res.end(JSON.stringify(result));
    });
});

module.exports = router;