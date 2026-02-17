require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
 cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,


});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'MajorProject',
    allowed_formats: ['jpeg', 'png', 'jpg']
  }
});

console.log('Cloudinary API Key:', process.env.CLOUD_API_KEY);
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("CLOUD_KEY:", process.env.CLOUD_API_KEY);
console.log("CLOUD_SECRET:", process.env.CLOUD_API_SECRET);



module.exports = { cloudinary, storage };
