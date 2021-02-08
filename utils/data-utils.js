//data-utils.js
var sql = require('mysql');

var authenticateUser = function (u, p, callback) {
	var con = sql.createConnection({
	  host: "107.180.1.16",
	  user: "2021group3",
	  password: "group32021",
	  database: "2021group3"
	});
	con.query("CALL checkLogIn('" + u + "','" + p +"')", function (err, result) {
		if (err) throw err;
		con.end();
		return callback(null, result[0][0].valid);
	});
};

var getUserById = function (id, callback) {
	var con = sql.createConnection({
	  host: "107.180.1.16",
	  user: "2021group3",
	  password: "group32021",
	  database: "2021group3"
	});
	con.query("CALL checkUserById('" + id + "')", function (err, result) {
		if (err) throw err;
		con.end();
		return callback(null, result);
	});
};

var getUserByName = function (name, callback) {
	var con = sql.createConnection({
	  host: "107.180.1.16",
	  user: "2021group3",
	  password: "group32021",
	  database: "2021group3"
	});
	con.query("CALL checkUserByName('" + name + "')", function (err, result) {
		if (err) throw err;
		con.end();
		return callback(null, result[0][0]);
	});
};

module.exports = {authenticateUser, getUserById, getUserByName};

