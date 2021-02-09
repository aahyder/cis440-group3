//data-utils.js
const util = require('util');
const sql = require('mysql');

// convert query callbacks into promise objects
//con.query = util.promisify(con.query);

// SP call functions
var authenticateUser = function (u, p, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	console.log("CALL checkLogIn('" + u + "','" + p +"')");
	con.query("CALL checkLogIn('" + u + "','" + p +"')", function (err, result) {
		if (err) throw err;
		console.log('SP result: '+result[0][0].valid);
		con.end();
		return callback(null, result[0][0].valid);
	});
};

var getUserById = function (id, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	con.query("CALL checkUserById('" + id + "')", function (err, result) {
		if (err) throw err;
		con.end();
		console.log('GetUserById SP: '+JSON.stringify(result));
		return callback(null, result);
	});
};

var getUserByName = function (name, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	console.log("CALL checkUserByName('" + name + "')");
	con.query("CALL checkUserByName('" + name + "')", function (err, result) {
		if (err) throw err;
		console.log('getUserByName SP: '+JSON.stringify(result[0][0]));
		con.end();
		return callback(null, JSON.stringify(result[0][0]));
	});
};

module.exports = {authenticateUser, getUserById, getUserByName};

