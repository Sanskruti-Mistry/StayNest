const express = require("express");
const router =  express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,  
        wrapAsync(listingController.createListing)   
    );
    

//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, wrapAsync(listingController.destroyListing));


// EDIT Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;


//INDEX ROUTE
// router.get("/", wrapAsync(listingController.index));


//SHOW ROUTE
// router.get("/:id", wrapAsync(listingController.showListing));

//CREATE ROUTE
// router.post(
//     "/",
//     validateListing,
//     isLoggedIn,
//     wrapAsync(listingController.createListing)   
// );

//UPDATE Route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing));

//DELETE ROUTE
// router.delete("/:id", isLoggedIn, wrapAsync(listingController.destroyListing));

