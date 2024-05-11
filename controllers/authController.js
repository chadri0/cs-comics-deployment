//  require passport and bcrypt
const passport = require("passport"); 
const bcrypt = require("bcrypt");

// require User model
const User = require("../models/userModel");

// loginLocalFailed
const loginLocalFailed = (request, response, next) => {
    response.status(401).json({
        error: {
            message: "Username or password is incorrect.",
            statusCode: 401 //unauthorized error
        }
    });
};

// logoutRequest
const logoutRequest = (request, response, next) => {
    logout(err => {
        if (err) {
            response.status(400).json({
                error: {
                    message: "Something went wrong!",
                    statusCode: 400 //bad request
                }
            });
        } else {
            response.status(200).json({
                success: {
                    message: "User logged out!",
                    statusCode: 200
                }
            });
        }
    });
};

// signupRequest
const signupRequest = async (request, response, next) => {
    const { firstName, lastName, username, password } = request.body;

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        }

        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword
        });
        try {
            await newUser.save();
            
            // login the user after signing up
            request.login(newUser, (err) => {
                if (err) {
                    return response.status(400).json({
                        error: {
                            message: "Something went wrong while signing up!",
                            statusCode: 400
                        }
                    });
                }
                response.status(200).json({
                    success: {
                        message: "User signed up successfully!",
                        statusCode: 200
                    }
                });
            });
        } catch (err) {
            if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
                return response.status(400).json({
                    error: {
                        message: "Username already exists",
                        statusCode: 400
                    }
                });
            } else {
                return response.status(500).json({
                    error: {
                        message: "Internal server error",
                        statusCode: 500
                    }
                });
            }
        }
    });
};


// export
module.exports = {loginLocalFailed, logoutRequest, signupRequest};