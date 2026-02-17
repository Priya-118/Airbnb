const User = require('../models/user');
const passport = require('passport');

// GET: Signup Page
module.exports.signup = (req, res) => {
  res.render('users/signup.ejs');
};

// POST: Signup User
module.exports.signuppost = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wonderlust!");
      res.redirect('/listings');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/signup');
  }
};

// GET: Login Page
module.exports.loginGet = (req, res) => {
  res.render('users/login.ejs');
};

// POST: Login User
module.exports.loginPost = (req, res) => {
  req.flash('success', "Welcome back to Wonderlust!");

  // Safe handling of redirect URL
  const redirectUrl = res.locals.redirectUrl || '/listings';
  res.redirect(redirectUrl);
};

// GET: Logout User
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You are logged out");
    res.redirect('/listings');
  });
};
