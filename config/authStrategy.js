// require passport and bcrypt. define local strategy
const passport = require("passport"); 
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

// define the github strategy
const GithubStrategy = require("passport-github").Strategy;

// define google strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// require user model
const User = require("../models/userModel");

// implement local strategy
passport.use(
    new LocalStrategy(function verify(username, password, done) {
        User.findOne({username:username})
        .then((user) => {
            if (!user) {
                return done(null, false, {message: "User not found"});
            }
            bcrypt.compare(password, user.password, (error, result) => {
                console.log("result, result");
                if (error) {
                    return done(error);
                }
                return done(null, user);
            });
        })
        .catch((error) => {
            console.log(`There was an error finding the user from database: ${error}`);
        });
    })
);

// implement github strategy
passport.use(new GithubStrategy({ //container to use the strategy
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    callbackURL: "http://localhost:3000/auth/github"
}, 
    (accessToken, refreshToken, profile, done) => { 
    console.log(profile); 
    return done(null, profile); 
    })
);

// implement google strategy
passport.use(new GoogleStrategy({ 
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/admin"
    },
    (accessToken, refreshToken, profile, done) => { 
        console.log(profile); 
        return done(null, profile); 
    })
);

// implement serializeUser/deserializeUser functions
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
