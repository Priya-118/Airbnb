const Listing = require('./models/listing');
module.exports.isLoggedIn =(req,res,next) => {
   if(!req.isAuthenticated()) {
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must be logged in to create listing!")
   return res.redirect('/login');
  }
  next();
};

module.exports.saveRedirectUrl = ( req ,res ,next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
};

// middleware/isOwner.js


module.exports.isOwner = async (req, res, next) => {
  try {
    const { id } = req.params; // e.g., /listings/:id
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Check if logged-in user is the owner
    if (!listing.owner==req.user._id) {
      return res.status(403).json({ error: 'You do not have permission' });
    }

    // ✅ User is owner
    next();
  } catch (err) {
    next(err);
  }
};
