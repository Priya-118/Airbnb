
require('dotenv').config({ path: __dirname + '/../.env' });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const multer = require('multer');
const { storage } = require('./cloudConfig');
const upload = multer({ storage });


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

// MongoDB Connection

// const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

main()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
// Session config
const sessionOptions = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));
app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash and user middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curruser = req.user;
  next();
});

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.get("/", (req, res) => {
  res.send("Airbnb backend is running successfully 🚀");
});








// const ExpressError = require("./utils/ExpressError");
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found !!"));
// });

const port =process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on ADDRESS http://localhost:${port}`);
});
