const dataServices = require('./data-utils.js');
//const bycrypt = require('bcrypt');

function User() {};

User.prototype = {
    // query user by id
    find : function(user = null, callback) {
        if(user) {
            var id = user;
            console.log(user + " " + id);
            dataServices.getUserByName(id, function(err, result){
                if (err) throw err;
                console.log('user find: '+result);
                // return sp data to callback
                callback(result);
            });
        }
    },
    // insert new user data
    create : function(body, callback) {
        //TODO
    },
    // log in user
    login : function (username, password, callback) {
        dataServices.authenticateUser(username, password, function(err, result) {
            if (err) throw err;
            console.log('authentication call: '+result);
            if (result == 1) {
                dataServices.getUserByName(username, function(err, result){
                    if (err) throw err;
                    console.log('user find: '+result);
                    // return sp data to callback
                    callback(result);
                });
            } else {
                console.log('user login failed!');
            }
        });
    }
}

module.exports = User;