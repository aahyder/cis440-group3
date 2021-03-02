# Group Project Intro

Welcome to CIS440 group 3's project repo! This is a free web app that replaces boring, vanilla employee surveys with an employee community forum app with unique user, admin, and manager functionality. Managers can post topics for discussion to all user accounts to provide feedback through comments. Managers can reply to individual user comments, and all users can like or dislike comments submitted on a post. Managers always post with their first and last named displayed, and a visual indicator that they are a manager when commenting. admin and user accounts are anonymous and managers are not able to single out any specific user based on their comment or post. Users can also submit issues to be viewed by managers where they can raise concerns or ask questions anonymously to be answered by managers. Lastly, admins can approve or deny new account requests for new users and also have a visual indicator to signal they are an admin when commenting although remaining anonymous. Admins can also send emails to all managers. During the account request process, the server will email those requesting an account upon recieving the account request, and will generate emails if the account is approved with a new random user name and password, and when denied with a reason for denial written by the admin.

# App Overview
This model-view-controller (MVC) app was developed using node.js, HTML, CSS, and vanilla javascript. We implemented bootstrap4 and EJS as front end frameworks for templating and styling views. Express was used for our routes and server middleware to serve our templates to the browser and run our APIs for object models to call to retrieve data from our MySQL database.

# Set-Up Instructions

1.) to set up the project, you'll want to clone the repository and then navigate the cis440-group3 project folder you just cloned via the command line.

2.) if you do not have nodejs / npm installed, please do so.

3.) if nodjs / npm is up to date, type "npm i bcrypt, dotenv, ejs, express, express-flash, express-session, mysql, nodemailer, nodemon" into the command line and press enter

4.) Once all dependencies are installed, type "node server.js" to start the web server

5.) Lastly, go to your browser of choice and type "localhost:3000" into the address bar and press enter to begin using the app.

# Test Data
admin account: testuser1 / test1234

user account: testuser2 / test1234

manager account: testuser3 / test1234
