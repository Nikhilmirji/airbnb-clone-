const user = require("../models/user");

module.exports.viewuserform=async (req, res) => {
    res.render("signup.ejs")
}

module.exports.loginuser=async (req, res) => {
    res.render('./login.ejs')
}

module.exports.createuser=async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new user({ email, username })
        const reguser = await user.register(newuser, password)
        console.log(reguser)
        req.login(reguser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "new user was registered");
            let redirectUrl = res.locals.redirectUrl || "/listing";
            res.redirect(redirectUrl);
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }


}

module.exports.logincreate=async (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        let redirectUrl = res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl);
    }

module.exports.logoutuser=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.flash("success", "logged out successfully")
        res.redirect("/listing")
    })

}