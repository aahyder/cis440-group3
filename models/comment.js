// comment.js
const dataServices = require('../utils/data-utils.js');
//const bycrypt = require('bcrypt');
function Comment() { };

Comment.prototype = {
    // list comments by post
    list: function (post = null, callback) {
        if (post) {
            var id = post;
            dataServices.getCommentsById(id, function (err, result) {
                if (err) throw err;
                console.log('post find call ' + result);
                // return sp data to callback
                callback(result);
            });
        }
    },
    // insert new comment data by user type
    create: function (user, utype, id, body, callback) {
        if (utype == 3) {
            dataServices.addNewComment(user, 3, id, body, function (err, result) {
                if (err) throw err;
                console.log('comment create call: ' + result);
                callback(result);
            });
        } else if (utype == 1) {
            dataServices.addNewComment(user, 4, id, body, function (err, result) {
                if (err) throw err;
                console.log('comment create call: ' + result);
                callback(result);
            });
        } else {
            dataServices.addNewComment(user, 5, id, body, function (err, result) {
                if (err) throw err;
                console.log('comment create call: ' + result);
                callback(result);
            });
        }
    },
    // update comment data by user type
    update: function (user, utype, id, body, callback) {
        if (utype == 3) {
            dataServices.updateComment(user, id, body, function (err, result) {
                if (err) throw err;
                console.log('comment create call: ' + result);
                callback(result);
            });
        }
    }    
}

module.exports = Comment;