const express = require("express");
const app = express();
const users = require("./user");
const flash = require("connect-flash")
const session = require("express-session")
const path = require("path")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionoption = {
    secret: "this is my secret",
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionoption));
app.use(flash());

// app.get("/test",(req,res)=>{
//     res.send("test successfull")
// })
// app.use((req, res, next) => {
//     req.locals.errormsg = req.flash("error")
//     req.locals.successmsg = req.flash("success")
//     next();
// })

app.get("/register", (req, res) => {
    let { name = 'anonymus' } = req.query;
    req.session.name = name;

    if (name === 'anonymus') {
        req.flash("error", 'user not  registerd')
    }
    else {

        req.flash("success", 'user registerd successfully!')
    }

    res.redirect('/testt');
    // console.log(name)
})

app.get("/testt", (req, res) => {

    // can also use req.locals.msg=req.flash("success")
    res.locals.errormsg = req.flash("error")
    res.locals.successmsg = req.flash("success")

    res.render("page.ejs", { name: req.session.name });
})

app.get("/reqcount", (req, res) => {
    if (req.session.count) {

        req.session.count++;
    }
    else {
        req.session.count = 1;
    }
    res.send(`you have send the request ${req.session.count} times `)
})
// const cookieParser=require("cookie-parser")
// app.use(cookieParser());

// app.use("/user",users)

// app.get("/",(req,res)=>{
//     res.send("welcome to the home root!")
//     console.dir(req.cookies);
// })
// app.get("/getcookies",(req,res)=>{
//     res.cookie("nikhil","deng");
//     res.cookie("hemd","hund");
//     res.send("sent some cookies")
//})

app.listen(3000, () => {
    console.log("server is running on port 3000");
}
)