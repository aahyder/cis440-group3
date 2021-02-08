// authentication.js
var dataServices = require('./data-utils');

var LocalStrategy = require('passport-local').Strategy;

function init(passport) {
    const checkPassport = function(name, pass, done) {
        dataServices.authenticateUser(name, pass, function(err, user) {
            if (err) throw err;
            if (user !== 1) {
                console.log('invalid user');
                return done(null, false, { message: "ERROR: Invalid Log-in" });
            }
            else {
                console.log('valid user');
                dataServices.getUserByName(name, function (err, result){
                    if (err) return err;
                    console.log(result);
                    return done(null, result);
                });
            }
        });            
    };
    passport.use('local', new LocalStrategy({ usernameField: 'username'}, checkPassport));
    passport.serializeUser(function(user_id, done){
        console.log(user_id);
        done(null, user_id);
    });
    passport.deserializeUser((id, done) => {
        return done(null, dataServices.getUserByName(id, function (err, result) {
            if (err) return err;
            console.log ('authenticate: ' + result[0]);
            console.log('authenticate: ' + result[0][0])
            return result[0].UserID;
        }));
    });
};

module.exports = init;