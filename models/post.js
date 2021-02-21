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
                console.log('post find: ' + result[0]);
                // return sp data to callback
                callback(result[0]);
            });
        }
    },
    // insert new request data
    create: function (name, email, callback) {
        dataServices.createNewRequest(name, email, function (err, result) {
            if (err) throw err;
            console.log('create post: ' + result[0]);
            callback(result[0]);
        });

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