// // utils/cloudinary.js
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'event-organizer-app', // Folder in Cloudinary to store images
//         format: async (req, file) => 'png', // supports promises as well
//         public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
//     },
// });

// const upload = multer({ storage: storage });

// module.exports = { cloudinary, upload };


// // utils/cloudinary.js
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');


// // Cloudinary ke credentials ko .env file se configure karein
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'event-organizer-app', // Cloudinary mein images store karne ke liye folder
//         // file ke asli format ko use karein, hardcode na karein
//         format: async (req, file) => {
//             const ext = file.originalname.split('.').pop();
//             return ['jpg', 'jpeg', 'png', 'gif'].includes(ext.toLowerCase()) ? ext.toLowerCase() : 'png';
//         },
//         public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
//     },
// });

// const upload = multer({ storage: storage });

// module.exports = { cloudinary, upload };


// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Cloudinary configuration from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage ko memoryStorage mein badla gaya hai
// Isse files disk par save nahi hongi, balki server ki memory mein rahengi
const storage = multer.memoryStorage();

// File upload ke liye multer middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

module.exports = { cloudinary, upload };

