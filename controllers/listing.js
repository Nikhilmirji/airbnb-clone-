const Listing = require("../models/listing");

module.exports.index=async (req, res) => {

    let alllisting = await Listing.find({});
    res.render("index.ejs", { alllisting });
}

module.exports.rendernewform=(req, res) => {
   
    res.render("new.ejs");
}

module.exports.showlisting=async (req, res) => {
    let { id } = req.params;
    const listting = await Listing.findById(id)
        .populate({
            path: "review",
            populate: {
                path: "author"
            }
        })
        .populate("owner");
    if (!listting) {
        req.flash("error", 'The Listing You Are Trying To Access Does Not Exist!');
        return res.redirect("/listing");
    }
    res.render("show.ejs", { listting });
}
module.exports.createlisting=async (req, res) => {
    // If the form somehow included an `image` field, remove it to avoid
    // casting conflicts when we set the structured `image` below.
    if (req.body && req.body.listing && req.body.listing.image) {
        delete req.body.listing.image;
    }
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        newlisting.image = { url, filename };
    }
    await newlisting.save();
    req.flash("success", 'new listing added!')
    res.redirect("/listing");
}

module.exports.editlisting=async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", 'The Listing You Are Trying To Access Does Not Exist!');
        return res.redirect("/listing");
    }
    let originalimage=listing.image.url;
    originalimage=originalimage.replace("/upload","/upload/w_300")
    res.render("edit.ejs", { listing,originalimage });
}

module.exports.updatelisting=async (req, res) => {
    let { id } = req.params;
    let listing =await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(req.file!=="undefined"){
     let url = req.file.path;
     let filename = req.file.filename;
     listing.image={url,filename}
     await listing.save()
}
    req.flash("success", 'listing updated!')
    res.redirect(`/listing/${id}`

    );
}

module.exports.deletelisting=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
   
    req.flash("success", 'listing deleted')
    res.redirect("/listing");

}