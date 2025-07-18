const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/user.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post( wrapAsync(userController.signup));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), userController.login);

router.get("/logout", userController.logout);

module.exports = router;

// router.get("/signup", userController.render.SignupForm);

// router.post(
//     "/signup", 
//     wrapAsync(userController.signup)
// );

// router.get("/login", userController.renderLoginForm);

// router.post("/login", loginpassport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), userController.login);

