const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
  try {
    let allListings = [];
    const { q, filter } = req.query;  // Search + filter

    let query = {};  // Build MongoDB query

    if (q && q.trim()) {
      const searchRegex = new RegExp(q.trim(), 'i');
      query.$or = [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
        { country: { $regex: searchRegex } }
      ];
    }

    if (filter && filter !== 'all') {
      query.category = filter;  // Exact match
    }

    // Special case: 'trending' could sort by date/price instead
    if (filter === 'trending') {
      allListings = await Listing.find({}).sort({ createdAt: -1 }).limit(10);  // Recent first (add createdAt to schema if missing)
    } else {
      allListings = await Listing.find(query).sort({ title: 1 });  // Alphabetical
    }

    res.render("listings/index.ejs", { 
      allListings,
      searchQuery: q || '',
      activeFilter: filter || ''  // Pass for UI highlighting
    });
  } catch (err) {
    next(err);
  }
};

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");  
};

module.exports.showListing = async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path:"reviews", 
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if(!listing){
        req.flash("error", "The Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    const geoData = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

    if (!geoData.body.features.length) {
        req.flash("error", "Invalid location provided");
        return res.redirect("/listings/new");
    }

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    newListing.geometry = {
        type: "Point",
        coordinates: geoData.body.features[0].geometry.coordinates
    };

    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "The Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250,h_300,c_fill");

    // 🔧 Pass it to the EJS
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send a valid data for listing");
  }

  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  
  if(typeof req.file != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();

  }
  
//   if (req.file) {
//     listing.image = {
//       url: req.file.path,
//       filename: req.file.filename,
//     };
//     await listing.save(); // Save the new image
//   }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};