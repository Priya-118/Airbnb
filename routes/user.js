const express = require('express');
const router = express.Router();
const wrapasync = require('../utils/wrapasync');
const { saveRedirectUrl } = require('../middleware');
const userController = require('../controllers/user');
const passport = require('passport');

router
   .route('/signup')
   .get( userController.signup)
   .post( wrapasync(userController.signuppost)
  );

router 
  .route('/login')
  .get( userController.loginGet)
  .post(
  saveRedirectUrl,
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  userController.loginPost
);


// Logout Route
router.get('/logout', userController.logout);

module.exports = router;
