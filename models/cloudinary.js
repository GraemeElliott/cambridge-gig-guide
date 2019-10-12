//************* Image Upload Configuration *************\\

const multer = require("multer");
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const imageFilter = function(req, file, callback) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: 'cambridge-gig-guide', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//************* END Image Upload Config *************\\

// export upload and cloudinary
module.exports = {
  cloudinary: cloudinary,
  upload: upload
};
