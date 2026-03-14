# Airbnb Clone - Backend Service

A robust RESTful API built for a vacation rental marketplace. This project handles user authentication, property listings, and a review system, following the MVC (Model-View-Controller) architecture.

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Atlas)
* **ODM:** Mongoose
* **Authentication:** Passport.js / JWT (choose which you used)
* **Templating:** EJS (if using server-side rendering) or JSON for API
* **Styling:** Bootstrap (for UI elements)

## ✨ Key Features

* **User Authentication:** Secure signup and login functionality.
* **Listing Management:** Full CRUD (Create, Read, Update, Delete) for property listings.
* **Review System:** Users can leave ratings and comments on specific listings.
* **Cloud Image Storage:** (Optional: mention if you used Cloudinary/AWS S3).
* **Responsive Design:** Optimized for mobile and desktop views.

## 📂 Project Structure

```text
majorproject/
├── models/         # Mongoose schemas (User, Listing, Review)
├── routes/         # Express route handlers
├── controllers/    # Business logic for routes
├── views/          # EJS templates (if applicable)
├── public/         # Static files (CSS, JS, Images)
├── utils/          # Error handling and validation (Joi)
├── app.js          # Entry point
└── .env            # Environment variables

🛠️ Installation & Setup
Clone the repository:Bashgit clone [https://github.com/Priya-118/Airbnb.git](https://github.com/Priya-118/Airbnb.git)
cd Airbnb
Install dependencies:Bash npm install

Environment Variables:Create a .env file in the root directory and add:Code snippet
MONGO_URL=your_mongodb_connection_string
SECRET=your_session_secret
Run the application:Bash npm start
# or if you have nodemon installed
nodemon app.js

## 🌐 Live Demo
🔗 (https://airbnb-bla9.onrender.com/)
