// email-utils.js
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cis440group3',
    pass: '2021cis440!'
  }
});

var emailNotify = function(email, subject, msg) {
  var mailOptions = {
    from: 'cis440group3@gmail.com',
    to: email,
    subject: subject,
    text: msg
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log(mailOptions);
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {emailNotify};