const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware");
const ReviewController = require('../controllers/review');
const wrapasync = require("../utils/wrapasync");
// console.log("wrapasync type:", typeof wrapasync);


// console.log("ReviewController:", ReviewController);


// POST route - add review
router.post("/",isLoggedIn,  wrapasync(ReviewController.createReview));

// POST route - delete review
router.post("/:reviewId",isLoggedIn,  wrapasync(ReviewController.destroyReview));

module.exports = router;


