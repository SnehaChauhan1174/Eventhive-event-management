const cloudinary = require('cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'eventhive_DEV',
    allowed_formats: ['png','jpg','jpeg'], // supports promises as well
    
  },
});

module.exports={
    cloudinary,storage
}
 