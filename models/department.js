// department.js
const dataServices = require('../utils/data-utils.js');

function Deparment() {};

Deparment.prototype = {
    // get pending requests
    list : function(callback) {
        dataServices.getDepartments(function(err, result) {
            if(err) throw err;
            console.log('deparment list call: '+result);
            // return sp data to callback
            callback(result);
        }); 
    }
};

module.exports = Deparment;