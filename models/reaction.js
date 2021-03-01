// reaction.js
const dataServices = require('../utils/data-utils.js');
//const bycrypt = require('bcrypt');
function Reaction() { };

Reaction.prototype = {
    // list comments by post
    list: function (user, post, callback) {
        if (user) {
            dataServices.getReactionsByPost(user, post, function (err, result) {
                if (err) throw err;
                console.log('reaction list call ' + result);
                // return sp data to callback
                callback(result);
            });
        }
    },
    // insert new reaction data
    create: function (comment, user, type, callback) {
        dataServices.addReaction(comment, user, type, function (err, result) {
            if (err) throw err;
            console.log('reaction create call: ' + result);
            callback(result);
        });
    }
}

module.exports = Reaction;