// const { request } = require("express")

// require express and passport
const express = require("express");
const passport = require("passport");

// link handler functions from authController
const {loginLocalFailed, logoutRequest, signupRequest} = require("../controllers/authController");

// define router
const router = express.Router();

router.post(
    "/login/local",
    passport.authenticate("local", {failureRedirect: "/login.local/failed"}),
    (request, response, next) => {
        response.status(200).json({
            success: {message: "User logged in."},
            data: {
                userName,
                firsName,
                lastName,
            },
            statusCode: 200,
        })
    }

);

// create a GET to the path of /logout with the handler function of logoutRequest
router.get("/login/local/failed", loginLocalFailed);

// create a GET to the path of /logout with the handler function of logoutRequest
router.get("/logout", logoutRequest);

// create a POST to the path of /signup with the handler function of signupRequest
router.post("/signup", signupRequest);

// GET to the path of /login/github
router.get("/login.github", passport.authenticate("github"));

// GET to the path of /login/github/failed
router.get("/login/github/failed", (request, response, next) => {
    response.json({message: "There is a problem with Github Authentication."})
});

// GET to the path of /auth/github
router.get("/auth/github", passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login/github/failed"
}));

// GET to the path of /login/google
router.get("/login/google", passport.authenticate("google", {scope: ["profile"]}));

// GET to the path of /login/google/failed
router.get("/login/google/failed", (request, response, next) => {
    response.json({message: "There is a problem with Google Authentication."});
});

// GET to the path of /auth/google
router.get("/auth/google", passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login/google/failed"
}));

// export
module.exports = router;