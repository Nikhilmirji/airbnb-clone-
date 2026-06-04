if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()

}
console.log(process.env)
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const Review = require("./models/review.js")
const path = require("path");
const ejsmate = require("ejs-mate")
app.engine("ejs", ejsmate)
// app.use(express.static(path.join(__dirname,"/public")))
app.use(express.static(path.join(__dirname, "public")));
const session = require("express-session")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const mo = require("method-override")
const ExpressError = require("./expresserror.js")
const wrapasync = require("./wrapasync.js");
app.use(mo("_method"))
const flash = require("connect-flash")
const passport = require("passport")
const localstrategy = require("passport-local")
const user = require("./models/user.js")

app.use(express.urlencoded({ extended: true }));
const { listingSchema, reviewSchema } = require("./schema.js");
const listing = require("./models/listing.js");
// app.use(flash());
const listings = require("./routes/listing.js");
const nwreviews = require("./routes/review.js");
const userrev = require("./routes/user.js");
const review = require("./models/review.js");

main().then(res => {
    console.log("the connection was successful")
})
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const sessionoptions = {
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true

    }
}
app.use(session(sessionoptions))
app.use(flash())


app.use(passport.initialize())
app.use(passport.session())
passport.use(new localstrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())


// app.get('/demouser', async (req, res) => {
//     let fakeuser = new user({
//         email: "nikhil@stud.com",
//         username: "student"
//     })
//     let registeruser = await user.register(fakeuser, "nikhil123");
//     res.send(registeruser);
// })

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currentUser = req.user;
    next();

})

// app.get("/testListing", async (req, res) => {
//     let samplist = new Listing({
//         title: "my new villa",
//         description: "by the beachh",
//         price: 1200,
//         location: "goa",
//         country: "india"
//     });

//     await samplist.save()
//     console.log("listing saved")
//     res.send("the lisitng is saved successfully");

// })





const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


app.use("/listing", listings);
app.use("/listing/:id/review", nwreviews);
app.use("/", userrev);



app.all("", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Error-handling middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).render("error.ejs", { message });
    // res.status(status).send(message);
});






app.listen(8080, () => {
    console.log("server is running on port 8080")
})