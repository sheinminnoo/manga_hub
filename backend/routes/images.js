const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer'); // for handling multipart/form-data

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'da00l5rsb',
    api_key: '212345425193916',
    api_secret: 'NmWdTg9rXQFijE0_XAXfTwFAnJo'
});

// Set up multer storage to handle file uploads
const storage = multer.diskStorage({});

const upload = multer({ storage });

// Route to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Check if a custom filename is provided in the request body
    let { filename } = req.body;
    
    // If no filename provided, use the original filename
    if (!filename) {
      filename = req.file.originalname;
    }

    // Upload image to Cloudinary with custom public_id
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: filename  // Use the provided filename as public_id
    });

    // Return the image URL from Cloudinary
    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
