//data-utils.js
const sql = require('mysql');

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

var getRequestById = function (id, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	console.log("CALL checkRequestById('" + id + "')");
	con.query("CALL checkRequestById('" + id + "')", function (err, result) {
		if (err) throw err;
		con.end();
		console.log('getRequestById SP: '+JSON.stringify(result));
		return callback(null, result);
	});
};

var getDepartments = function (callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	con.query("CALL checkDepartments()", function (err, result) {
		if (err) throw err;
		con.end();
		console.log('checkDepartments SP: '+JSON.stringify(result[0]));
		return callback(null, JSON.stringify(result[0]));
	});
};

var getJobs = function (id, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	con.query("CALL checkJobs("  + id + ")", function (err, result) {
		if (err) throw err;
		con.end();
		console.log('checkJobs SP: '+JSON.stringify(result[0]));
		return callback(null, JSON.stringify(result[0]));
	});
};

var getPendingRequests = function (callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	con.query("CALL checkPendingRequests()", function (err, result) {
		if (err) throw err;
		con.end();
		console.log('checkPendingRequests SP: '+JSON.stringify(result[0]));
		return callback(null, JSON.stringify(result[0]));
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

var createNewRequest = function (email, fname, lname, dept, job, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	console.log("CALL addNewRequest('" + fname + "','" + lname  + "','" + email  + "','" + dept  + "','" + job  + "')");
	con.query("CALL addNewRequest('" + fname + "','" + lname  + "','" + email  + "','" + dept  + "','" + job  + "')", function (err, result) {
		if (err) throw err;
		console.log('addNewRequest SP: '+JSON.stringify(result[0][0].addr));
		con.end();
		return callback(null, JSON.stringify(result[0][0].addr));
	});
};

var createNewUser = function (email, fname, lname, dept, job, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	console.log("CALL addUserRequest('" + fname + "','" + lname  + "','" + email  + "','" + dept  + "','" + job  + "')");
	con.query("CALL addNewRequest('" + fname + "','" + lname  + "','" + email  + "','" + dept  + "','" + job  + "')", function (err, result) {
		if (err) throw err;
		console.log('addNewRequest SP: '+JSON.stringify(result[0][0].id));
		con.end();
		return callback(null, JSON.stringify(result[0][0].id));
	});
};

module.exports = {authenticateUser, getUserById, getUserByName, createNewRequest, getPendingRequests, getDepartments, getJobs, createNewUser, getRequestById};

