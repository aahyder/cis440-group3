// email-utils.js
var nodemailer = require('nodemailer');

var emailNotify = function(email, subject, msg) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cis440group3',
      pass: '2021cis440!'
    }
  });

  var mailOptions = {
    from: email = 'cis440group3@gmail.com',
    to: email,
    subject: subject,
    text: msg
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {emailNotify};