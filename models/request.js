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
                console.log('request find: '+JSON.stringify(result));
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
    approve : function(request = null, callback) {
        if(request) {
            var id = request;
            dataServices.approveUserById(id, function(err, result){
                if(err) throw err;
                console.log('request approve: '+JSON.stringify(result));
                /// return sp data to callback
                callback(result);
            });
        }
    },
    // deny request
    deny : function(request, reason, callback) {
        if(request) {
            var id = request;
            dataServices.denyUserById(id, reason, function(err, result){
                if(err) throw err;
                console.log('request deny: '+result);
                /// return sp data to callback
                callback(result);
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