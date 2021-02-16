// request.js
const dataServices = require('../utils/data-utils.js');
//const bycrypt = require('bcrypt');
function Request() {};

Request.prototype = {
    // query user by id
    find : function(request = null, callback) {
        if(request) {
            var id = request;
            console.log(request + " " + id);
            dataServices.getRequestById(id, function(err, result){
                if (err) throw err;
                console.log('request find: '+result);
                // return sp data to callback
                callback(result);
            });
        }
    },
    // insert new request data
    create : function(email, fname, lname, dept, job, callback) {
        dataServices.createNewRequest(email, fname, lname, dept, job, function(err, result){
            if(err) throw err;
            console.log('create request: '+result);
            callback(result);
        });

    },
    // approve request
    approve : function(request = null, user = null, callback) {
        if(request && user) {
            var id = request;
            var apprMgr = user.UserID;
            dataServices.approveUserById(id, apprMgr, function(err, result){
                if(err) throw err;
                console.log('request approve: '+result[0]);
                /// return sp data to callback
                callback(result[0]);
            });
        }
    },
    // get pending requests
    list : function(callback) {
        dataServices.getPendingRequests(function(err, result) {
            if(err) throw err;
            console.log('request list call: '+result);
            // return sp data to callback
            callback(result);
        }); 
    }
}

module.exports = Request;