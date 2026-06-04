const express = require("express");
const router = express.Router({ mergeParams: true });
//const userrev = require("../routes/user.js");
const ExpressError = require("../expresserror.js")
const wrapasync = require("../wrapasync.js");
const user = require("../models/user");
const passport = require("passport")
const {saveredirecturl} = require("../middleware.js");
const usercontroller=require("../controllers/user.js");

//sign up route used to create a new account 
router.get("/signup", wrapasync(usercontroller.viewuserform));

//post route where the new user is being created
router.post("/signup", saveredirecturl, wrapasync(usercontroller.createuser));

//login route to sign in alraeddy exisiting user
router.get("/login", wrapasync(usercontroller.loginuser));

//login post route where the user is authenticated
router.post(
    "/login",
    saveredirecturl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    wrapasync(usercontroller.logincreate)
);

//logout route to logout the user
router.get('/logout', usercontroller.logoutuser);

module.exports = router;