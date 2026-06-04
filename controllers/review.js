const Review = require("../models/review.js")
const Listing = require("../models/listing.js")
module.exports.createreview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    listing.review.push(newreview);
    await newreview.save();
    await listing.save();
    console.log("new review saved !")
    req.flash("success", 'review created!')
    res.redirect(`/listing/${listing._id}`);
}
module.exports.deletereview=async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", 'review deleted!')
    res.redirect(`/listing/${id}`);
}