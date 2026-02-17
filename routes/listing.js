const express= require('express');
const router = express.Router();
const Listing = require("../models/listing");
const {isLoggedIn} =require('../middleware');
const mongoose = require('mongoose');
const listingController = require('../controllers/listings');
const reviewRoutes = require("./review");
const {listingSchema} = require('../schema');
const wrapasyncs = require("../utils/wrapasync");
const { isOwner } = require('../middleware');
const ExpressError = require("../utils/ExpressError");
const multer  = require('multer');
const req = require('express/lib/request');
const {storage} =require('../cloudConfig');
const upload = multer({ storage})


router
.route('/')
  .get( wrapasyncs(listingController.index))
  .post(isLoggedIn, upload.single('listing[image]'),wrapasyncs(listingController.Createroute));

//new house form
router.get("/new", isLoggedIn,(listingController.Rendernewform));

//edit route
router.get("/:id/edit",isLoggedIn, wrapasyncs(listingController.editListing));

router
  .route('/:id')
  .get( wrapasyncs(listingController.Showroute))
  .put(isLoggedIn,isOwner,upload.single('listing[image]'), wrapasyncs(listingController.updatelisting))
  .delete( isLoggedIn,isOwner,wrapasyncs(listingController.delete)
);



// in routes/listing.js or wherever your listing 
// Mount review routes
router.use("/:id/reviews", reviewRoutes);


module.exports = router;
