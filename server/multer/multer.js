const multer = require("multer");
const fs = require("fs");
const path = require("path");

// CommonJS automatically provides __filename and __dirname
// No need to manually declare them

// Function to ensure the upload directory exists
const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};


// Setup the multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "uploads");
        ensureDirectoryExists(uploadDir);
        cb(null, uploadDir);
    },



    filename: (req, file, cb) => {
        // Sanitize the original filename
        const sanitizedOriginalName = file.originalname.replace(
            /[^a-zA-Z0-9.]/g,
            "_"
        );
        cb(null, `${file.fieldname}_${Date.now()}_${sanitizedOriginalName}`);
    },
});




// Export multer setup using CommonJS
module.exports = { upload: multer({ storage: storage }).single("image") };
