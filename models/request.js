// request.js
const dataServices = require('../utils/data-utils.js');
//const bycrypt = require('bcrypt');
function Request() {};

Request.prototype = {
    // query user by id
    find : function(request = null, callback) {
        if(request) {
            var id = request;
            console.log(user + " " + id);
            dataServices.getRequestById(id, function(err, result){
                if (err) throw err;
                console.log('request find: '+result[0]);
                // return sp data to callback
                callback(result[0]);
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
            var apprDate = Date.now;
            var apprMgr = user.UserID;
            dataServices.approveUserById(id, apprMgr, apprDate, function(err, result){
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