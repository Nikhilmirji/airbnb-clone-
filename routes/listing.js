const express = require("express");

const router = express.Router();
const { listingSchema, reviewSchema } = require("../schema.js");
const wrapasync = require("../wrapasync.js");
const ExpressError = require("../expresserror.js")

const Listing = require("../models/listing.js")
const {isLoggedIn,isowner,validateListing} = require("../middleware.js");
const {saveredirecturl} = require("../middleware.js");
// const { isowner } = require("../middleware.js");
const listingController = require("../controllers/listing.js");


const multer  = require('multer')
const {storage}=require("../cloudconfig.js")

const upload = multer({ storage })
//we can also write using router.route function where we can club the calls with same path together
//even the below representation will work fine
// |
// v
// router.route('/')
// .get("/", wrapasync(listingController.index))
// .post("/",isLoggedIn,validateListing, wrapasync(listingController.createlisting))

//index route where the listings are listed
router.get("/", wrapasync(listingController.index));

//new route where you can create a new lsiting
router.get("/new", isLoggedIn, listingController.rendernewform);

//show route when you click on the particular listing 
router.get("/:id", wrapasync(listingController.showlisting));

//create a route to create a new listing
// router.post("/",isLoggedIn,validateListing, wrapasync(listingController.createlisting))
router.post('/', isLoggedIn, upload.single('image'), validateListing, wrapasync(listingController.createlisting));

//edit form for editing a listing
router.get("/:id/edit", isLoggedIn,isowner, wrapasync(listingController.editlisting));

//edit route where actaul editing happens...
router.put("/:id", isLoggedIn,isowner,validateListing, wrapasync(listingController.updatelisting));

//delete route where a lsiting is deleted
router.delete('/:id',isLoggedIn,isowner, wrapasync(listingController.deletelisting));

module.exports = router;