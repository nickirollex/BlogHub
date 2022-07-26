const localStrategy = require('passport-local').Strategy
const mongoose =  require('mongoose')
const bcrypt = require('bcrypt')

//User Model
const User = require('../models/User')

module.exports = function(passport){
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done) =>{
            //Email match
            User.findOne({email: email})
            .then(user =>{
                if(!email){
                   return done(null, false , {message:'This Email Is Not Registered !!'})
                }

                //password match
                bcrypt.compare(password , user.password , (err, isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null , user)
                    }else{
                        return done(null, false, {message: 'Password Is Incorrect'})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id); 
       // where is this user.id going? Are we supposed to access this anywhere?
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}