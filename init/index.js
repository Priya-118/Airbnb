const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30s
    });
    console.log("Database connected successfully");

    await initdb(); // Run seeding only after connection is established
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    mongoose.connection.close(); // Close connection after seeding
  }
}

const initdb = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};


main(); // Ensure the connection is established before running `initdb()`


