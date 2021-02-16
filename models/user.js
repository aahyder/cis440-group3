// user.js
const dataServices = require('../utils/data-utils.js');
//const bycrypt = require('bcrypt');

function User() {};

User.prototype = {
    // query user by id
    find : function(user = null, callback) {
        if(user) {
            var id = user;
            dataServices.getUserByName(id, function(err, result){
                if (err) throw err;
                console.log('user find: '+result[0]);
                // return sp data to callback
                callback(result[0]);
            });
        }
    },
    // insert new user data
    create : function(request, callback) {
        if(request) {
            var id = request;
            dataServices.createNewUser(id, function(err, result){
                if(err) throw err;
                console.log('user create'+result[0]);
                callback(result[0]);
            });
        }
    },
    // delete user data
    delete : function(id, callback) {
        //TODO
    },
    // update user data
    update : function(id, callback) {
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
                callback(null);
            }
        });
    }
}

module.exports = User;