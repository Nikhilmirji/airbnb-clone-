const listing=require("./models/listing.js");
const ExpressError = require("./expresserror.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js")
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Your should be logged in to created listing")
        return res.redirect("/login");
    }
    next();
}
module.exports.saveredirecturl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    } else {
        res.locals.redirectUrl = "/listing";
    }
    next();
}

module.exports.isowner = async (req, res, next) => {
    let { id } = req.params;
    let foundListing = await listing.findById(id);
    if (!foundListing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "you do not have permission to do that");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isauthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "you do not have permission to delete this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
}