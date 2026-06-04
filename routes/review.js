const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js")
const Listing = require("../models/listing.js")
const ExpressError = require("../expresserror.js")
const wrapasync = require("../wrapasync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const {isLoggedIn,isauthor} = require("../middleware.js");
const reviewcontroller=require("../controllers/review.js");
const review = require("../models/review.js");





// review 
// post call where the review gets created
router.post("/", isLoggedIn, wrapasync(reviewcontroller.createreview));

// review delete route for deleteing the review
router.delete("/:reviewId", isLoggedIn, isauthor, wrapasync(reviewcontroller.deletereview));


module.exports = router;