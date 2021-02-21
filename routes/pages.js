// pages.js
// set up middleware
const express = require('express');
const router = express.Router();

// set up smtp / email
const notification = require('../utils/email-utils');

// set up models
const User = require('../models/user');
const Request = require('../models/request');
const Department = require('../models/department');
const Job = require('../models/job');
const Post = require('../models/post');

// initialize models
const user = new User();
const request = new Request();
const deparment = new Department();
const job = new Job();
const post = new Post();

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
    if(user) {
        var user = JSON.parse(user);
        var fullname = user.FirstName + " " + user.LastName;
        console.log(user.UserTypeID);
        if(user.UserTypeID == 1) {
            res.redirect('/admin');
        } else if(user.UserTypeID == 3) {
            post.adminList(function (result) {
                console.log('index post home: ' + result)
                var data = JSON.parse(result);
                console.log(data);
                res.render('home.ejs', { username: fullname, data: data });
            });
        }else {
            post.list(function (result) {
                console.log('index post home: ' + result)
                var data = JSON.parse(result);
                console.log(data);
                res.render('home.ejs', { username: user.UserName, data: data });
            });
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
        if(user.UserTypeID == 3) {
            console.log('user is manager');
            res.render('home.ejs', {username: fullname})
        } else {
            console.log('regular user');
            post.list(function (result) {
                console.log('home get: ' + result)
                var data = JSON.parse(result);
                console.log(data);
                res.render('home.ejs', { username: user.UserName, data: data });
            });
        }
    } else {
        res.redirect('/');
    }
});

router.get('/admin', (req, res, next) => {
    var user = req.session.user;
    if(user) {
        var user = JSON.parse(user);
        console.log(user.UserTypeID)
        if (user.UserTypeID == 1){
            request.list(function(result) {
                console.log('admin get: '+result)
                var data = JSON.parse(result);
                console.log(data);
                res.render('admin.ejs', {username: user.UserName, data: data}); 
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
    var user = JSON.parse(user);
    console.log(user.UserTypeID)
    if(user.UserTypeID == 1) {
        request.approve(req.query.id, function(result){
            console.log('approve post: '+result);
            var data = JSON.parse(result);
            console.log(data)
            notification.emailNotify(data.NewEmail, 'Account Request Approved',"Your request has been approved. Your username is "+data.NewUser+" and your password is "+data.NewPassword+".");
            if(result) {
                res.redirect('/admin');
            }
        });
    } else {
        res.send('access denied');      
    }
});

router.post('/deny', (req, res, next) => {
    var user = req.session.user;
    var user = JSON.parse(user);
    console.log(req.query.id+" "+req.query.reason);
    if(user.UserTypeID == 1) {
        request.deny(req.query.id, req.query.reason, function(result){
            console.log('deny post: '+result);
            if(result) {
                notification.emailNotify(req.query.email,"Account Request Denied","I'm sorry, but your request was denied for the following reason: "+req.query.reason+".");
                res.redirect('/admin');
            }
        });
    } else {
        res.send('access denied');      
    }
});

router.post('/request', (req, res, next) => {
    var mail = req.query.email;
    var dept = req.query.dept;
    var title = req.query.title;
    var fname = req.query.fname;
    var lname = req.query.lname;
    request.create(mail, fname, lname, dept, title, function(result){
        console.log('request post: '+result);
        if (result == 1) {
            notification.emailNotify(mail,"Account Request Recieved","Thank you for signing up for a new account. You'll get another email once you're account has been approved or denied.");
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
        res.end(result);
    });
});

router.post('/email-managers', (req, res, next) => {
    var subject = req.query.subject;
    var body = req.query.email;
    var u = JSON.parse(req.session.user);
    if(u.UserTypeID == 1) {
        user.findManagers(function(result){
            console.log("admin-email post: "+result);
            var data = JSON.parse(result);
            console.log(data);
            var len = Object.keys(data).length;
            console.log(len);
            for(var i=0; i<len; i++) {
                console.log(data[i].EmailAddress+"\n"+subject+"\n"+body)
                notification.emailNotify(data[i].EmailAddress, subject, body);
            }
        });
        res.redirect('/admin');
    } else {
        res.send('Access Denied');        
    }
});

module.exports = router;