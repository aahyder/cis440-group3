// server.js
var dataServices = require("./data-utils");
var express = require('express');
var app = express();

const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.post('/sign-in', function(request, response, next) {
	var username = request.param("username");
	var pass = request.param("pw");
	console.log(username, " ", pass);
	dataServices.authenticateUser(username, pass, function(error, result) {
		if (error) return next(error);
		return response.status(200).json(result[0]);
  });
});

app.listen(port, () => {
  console.log(`server app listening at http://localhost:${port}`)
})