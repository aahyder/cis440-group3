// comment.js
const dataServices = require('../utils/data-utils.js');
//const bycrypt = require('bcrypt');
function Comment() { };

Comment.prototype = {
    // query user by id
    list: function (request = null, callback) {
        if (request) {
            var id = request;
            dataServices.getCommentsById(id, function (err, result) {
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
            dataServices.createNewComment(user, subject, body, type, function (err, result) {
                if (err) throw err;
                console.log('post create call: ' + result);
                callback(result);
            });
        } else if (utype == 3) {
            //TODO
        } else {
            //TODO
        }
    }
}

module.exports = Comment;