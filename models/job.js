// job.js
const dataServices = require('../utils/data-utils.js');

function Job() {};

Job.prototype = {
    // get pending requests
    list : function(dept, callback) {
        dataServices.getJobs(dept, function(err, result) {
            if(err) throw err;
            console.log('job list call: '+result);
            // return sp data to callback
            callback(result);
        }); 
    }
};

module.exports = Job;