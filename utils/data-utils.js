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

var approveUserById = function (id, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	console.log("CALL approveUserById('" + id + "')");
	con.query("CALL approveUserById('" + id + "')", function (err, result) {
		if (err) throw err;
		con.end();
		console.log('approveUserById SP: '+JSON.stringify(result[0]));
		return callback(null, JSON.stringify(result[0]));
	});
};

var denyUserById = function (id, reason, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	console.log("CALL denyUserById('" + id + "','"+reason+"')");
	con.query("CALL denyUserById('" + id + "','"+reason+"')", function (err, result) {
		if (err) throw err;
		con.end();
		console.log('denyUserById SP: '+result[0][0].DenyEmail);
		return callback(null, result[0][0].DenyEmail);
	});
};

var getPosts = function (callback) {
    // set up db connection
    var con = sql.createConnection({
        host: "107.180.1.16",
        user: "2021group3",
        password: "group32021",
        database: "2021group3"
    });
    con.query("CALL checkPosts()", function (err, result) {
        if (err) throw err;
        con.end();
        console.log('checkPosts SP: ' + JSON.stringify(result[0]));
        return callback(null, JSON.stringify(result[0]));
    });
};

var getPostById = function (id, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	con.query("CALL checkPostById('" + id + "')", function (err, result) {
		if (err) throw err;
		con.end();
		console.log('getPostById SP: '+JSON.stringify(result[0]));
		return callback(null, JSON.stringify(result[0]));
	});
};

var getCommentsById = function (id, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	con.query("CALL checkCommentsById('" + id + "')", function (err, result) {
		if (err) throw err;
		con.end();
		console.log('getCommentsById SP: '+JSON.stringify(result[0]));
		return callback(null, JSON.stringify(result[0]));
	});
};

var getMyIssues = function (id, callback) {
    // set up db connection
    var con = sql.createConnection({
        host: "107.180.1.16",
        user: "2021group3",
        password: "group32021",
        database: "2021group3"
    });
	console.log("CALL checkMyIssues("+id+")");
    con.query("CALL checkMyIssues("+id+")", function (err, result) {
        if (err) throw err;
        con.end();
        console.log('checkMyIssues SP: ' + JSON.stringify(result[0]));
        return callback(null, JSON.stringify(result[0]));
    });
};

var getAllIssues = function (callback) {
    // set up db connection
    var con = sql.createConnection({
        host: "107.180.1.16",
        user: "2021group3",
        password: "group32021",
        database: "2021group3"
    });
	console.log("CALL checkAllIssues()");
    con.query("CALL checkAllIssues()", function (err, result) {
        if (err) throw err;
        con.end();
        console.log('checkAllIssues SP: ' + JSON.stringify(result[0]));
        return callback(null, JSON.stringify(result[0]));
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
		console.log('getRequestById SP: '+JSON.stringify(result[0][0]));
		return callback(null, JSON.stringify(result[0][0]));
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

var getManagerEmails = function (callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	con.query("CALL getManagerEmails()", function (err, result) {
		if (err) throw err;
		con.end();
		console.log('getManagerEmails SP: '+JSON.stringify(result[0]));
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

var getReactionsByPost = function (user, id, callback) {
	// set up db connection
	var con = sql.createConnection({
		host: "107.180.1.16",
		user: "2021group3",
		password: "group32021",
		database: "2021group3"
	});
	console.log("CALL checkReactionsByPost(" + user + ","+ id +")");
	con.query("CALL checkReactionsByPost(" + user + ","+ id +")", function (err, result) {
		if (err) throw err;
		console.log('getReactionsByPost SP: '+JSON.stringify(result[0]));
		con.end();
		return callback(null, JSON.stringify(result[0]));
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

var createNewIssue = function (uID, sub, content, type, callback) {
    // set up db connection
    var con = sql.createConnection({
        host: "107.180.1.16",
        user: "2021group3",
        password: "group32021",
        database: "2021group3"
    });
    console.log("CALL createNewPost('" + uID + "','" + sub + "','"+ content +"',"+ type +")");
    con.query("CALL createNewPost('" + uID + "','" + sub + "','"+ content +"',"+ type +")", function (err, result) {
        if (err) throw err;
        console.log('createNewPost SP: ' + JSON.stringify(result[0][0].id));
        con.end();
        return callback(null, JSON.stringify(result[0][0].id));
    });
}

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

var updateUserAndPass = function (email, tempUName, tempPWord, newUName, newPWord) {
    // set up db connection
    var con = sql.createConnection({
        host: "107.180.1.16",
        user: "2021group3",
        password: "group32021",
        database: "2021group3"
    });
    console.log("CALL updateUserAndPass('" + email + "','" + tempUName + "','" + tempPWord + "','" + newUName + "','" + newPWord + "')");
    con.query("CALL updateUserAndPass('" + email + "','" + tempUName + "','" + tempPWord + "','" + newUName + "','" + newPWord + "')", function (err, result) {
        if (err) throw err;
        console.log('addNewRequest SP: ' + JSON.stringify(result[0][0].id));
        con.end();
        return callback(null, JSON.stringify(result[0][0].id));
    });
}

var addNewComment = function (uID, type, id, content, callback) {
    // set up db connection
    var con = sql.createConnection({
        host: "107.180.1.16",
        user: "2021group3",
        password: "group32021",
        database: "2021group3"
    });
    console.log("CALL addComment(" + uID + "," + id + "," + type + ",'" + content + "')");
    con.query("CALL addComment(" + uID + "," + id + "," + type + ",'" + content + "')", function (err, result) {
        if (err) throw err;
        console.log('addComment SP: ' + JSON.stringify(result[0][0].id));
        con.end();
        return callback(null, JSON.stringify(result[0][0].id));
    });
}

var updateComment = function (uID, id, content, callback) {
    // set up db connection
    var con = sql.createConnection({
        host: "107.180.1.16",
        user: "2021group3",
        password: "group32021",
        database: "2021group3"
    });
    console.log("CALL updateComment(" + uID + "," + id + ",'" + content + "')");
    con.query("CALL updateComment(" + uID + "," + id + ",'" + content + "')", function (err, result) {
        if (err) throw err;
        console.log('updateComment SP: ' + JSON.stringify(result[0][0].id));
        con.end();
        return callback(null, JSON.stringify(result[0][0].id));
    });
}

var addReaction = function (comment, user, type, callback) {
    // set up db connection
    var con = sql.createConnection({
        host: "107.180.1.16",
        user: "2021group3",
        password: "group32021",
        database: "2021group3"
    });
    console.log("CALL addCommentReaction(" + comment + "," + user + "," + type + ")");
    con.query("CALL addCommentReaction(" + comment + "," + user + "," + type + ")", function (err, result) {
        if (err) throw err;
        console.log('updateComment SP: ' + JSON.stringify(result[0]));
        con.end();
        return callback(null, JSON.stringify(result[0]));
    });
}

var createNewPost = function (uID, sub, content, type, callback) {
    // set up db connection
    var con = sql.createConnection({
        host: "107.180.1.16",
        user: "2021group3",
        password: "group32021",
        database: "2021group3"
    });
    console.log("CALL createNewPost('" + uID + "','" + sub + "','"+ content +"',"+ type +")");
    con.query("CALL createNewPost('" + uID + "','" + sub + "','"+ content +"',"+ type +")", function (err, result) {
        if (err) throw err;
        console.log('createNewPost SP: ' + JSON.stringify(result[0][0].id));
        con.end();
        return callback(null, JSON.stringify(result[0][0].id));
    });
}

module.exports = {authenticateUser, getUserById, getUserByName, createNewRequest, getPendingRequests, getDepartments, getJobs, 
	createNewUser, getRequestById, approveUserById, denyUserById, getPosts, updateUserAndPass, addNewComment, getManagerEmails,
	createNewPost, getMyIssues, getPostById, getAllIssues, getCommentsById, updateComment, getReactionsByPost, addReaction, 
	createNewIssue};

