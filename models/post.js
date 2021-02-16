// request.js
const dataServices = require('../utils/data-utils.js');
//const bycrypt = require('bcrypt');
function Post() { };

Post.prototype = {
    // query user by id
    find: function (request = null, callback) {
        if (request) {
            var id = request;
            console.log(user + " " + id);
            dataServices.getRequestById(id, function (err, result) {
                if (err) throw err;
                console.log('request find: ' + result[0]);
                // return sp data to callback
                callback(result[0]);
            });
        }
    },
    // insert new request data
    create: function (name, email, callback) {
        dataServices.createNewRequest(name, email, function (err, result) {
            if (err) throw err;
            console.log('create request: ' + result[0]);
            callback(result[0]);
        });

    },
    // approve request
    approve: function (request = null, user = null, callback) {
        if (request && user) {
            var id = request;
            var apprDate = Date.now;
            var apprMgr = user.UserID;
            dataServices.approveUserById(id, apprMgr, apprDate, function (err, result) {
                if (err) throw err;
                console.log('request approve: ' + result[0]);
                /// return sp data to callback
                callback(result[0]);
            });
        }
    },
    // get pending requests
    list: function (callback) {
        dataServices.getPosts(function (err, result) {
            if (err) throw err;
            console.log('Post call: ' + result);
            // return sp data to callback
            callback(result);
        });
    }
}

module.exports = Post;