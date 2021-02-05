//data-utils.js
var sql = require('mysql');

var authenticateUser = function (u, p, callback) {
	var con = sql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "2021Donteven890!",
	  database: "cis440db"
	});
	con.query("CALL checkLogIn('" + u + "','" + p +"')", function (err, result) {
		if (err) throw err;
		return callback(null, result[0]);
	});
};

module.exports = {authenticateUser};

