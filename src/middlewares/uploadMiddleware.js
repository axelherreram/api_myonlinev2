const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the directory exists
const profilePhotoDir = path.join(__dirname, "../../public/profilephoto");
if (!fs.existsSync(profilePhotoDir)) {
  fs.mkdirSync(profilePhotoDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, profilePhotoDir);
  },
  filename: function (req, file, cb) {
    // Create a unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, req.user.user_id + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const uploadProfilePhoto = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = {
  uploadProfilePhoto
};
