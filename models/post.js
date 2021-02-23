// request.js
const dataServices = require('../utils/data-utils.js');
//const bycrypt = require('bcrypt');
function Post() { };

Post.prototype = {
    // query user by id
    find: function (request = null, callback) {
        if (request) {
            var id = request;
            dataServices.getPostById(id, function (err, result) {
                if (err) throw err;
                console.log('post find call ' + result);
                // return sp data to callback
                callback(result);
            });
        }
    },
    // insert new post data by user type
    create: function (user, utype, type, subject, body, callback) {
        if (utype == 2) {
            dataServices.createNewIssue(user, subject, body, type, function (err, result) {
                if (err) throw err;
                console.log('post create call: ' + result);
                callback(result);
            });
        } else if (utype == 3) {
            //TODO
        } else {
            //TODO
        }
    },
    // get posts by user type
    list: function (user, type, callback) {
        if(user) {
            if(type == 3) {
                dataServices.getMyIssues(user, function (err, result) {
                    if (err) throw err;
                    console.log('post list type 3 call: ' + result);
                    // return sp data to callback
                    callback(result);
                });
            } else if(type == 2) {
                dataServices.getAllIssues(function (err, result) {
                    if (err) throw err;
                    console.log('post list type 2 call: ' + result);
                    // return sp data to callback
                    callback(result);
                });
            } else {
                dataServices.getPosts(function (err, result) {
                    if (err) throw err;
                    console.log('post list default call: ' + result);
                    // return sp data to callback
                    callback(result);
                });
            }
        }
    }
}

module.exports = Post;