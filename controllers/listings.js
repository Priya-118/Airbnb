const Listing = require('../models/listing');
const { listingSchema } = require('../schema'); // adjust the path if needed
const mongoose=require('mongoose');

//index route
module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("index.ejs", { allListing });
}

//new route
module.exports.Rendernewform = (req, res) => {
  res.render("new.ejs"); 
}

//create route
module.exports.Createroute = async (req, res, next) => {
  console.log("File object:", req.file); // debug

  if (!req.file) throw new ExpressError(400, "Image upload failed");

  // Cloudinary secure_url
  req.body.listing.image = req.file.path;

  const { error } = listingSchema.validate(req.body);
  if (error) throw new ExpressError(400, error.details.map(e => e.message).join(","));

  const newlisting = new Listing(req.body.listing);
  newlisting.image = { url: req.file.path, filename: req.file.filename };

  await newlisting.save();
  req.flash("success", "New Listing Created!!");
  res.redirect("/listings");
};


// show route
module.exports.Showroute =async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id).populate("reviews").populate("owner");
  res.render("show.ejs", { data });
};

//edit route
module.exports.editListing =async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }
  const listId = await Listing.findById(id);
  if (!listId) {
    return res.status(404).send("Listing not found");
  }
  res.render("edit.ejs", { listId });
};

//update route
module.exports.updatelisting =async (req, res) => {
  if(!req.body){
    throw new ExpressError(404,"Send valid data for listing");
  }
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
    if(req.file) {
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename}
    await listing.save();
    }
    req.flash('success','Listing Updated');
    res.redirect(`/listings/${id}`);
};

// delete route
module.exports.delete =async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let remove = await Listing.findByIdAndDelete(id);
  console.log(remove);
  req.flash("success"," Listing Deleted!!");
  res.redirect("/listings");
};
