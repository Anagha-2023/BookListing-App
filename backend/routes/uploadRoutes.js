// routes/uploadRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';

// Configure storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Set the filename
  }
});

// Create multer instance with the specified storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },  // Limit the file size to 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);  // Accept the file
    } else {
      cb(new Error('Invalid file type'), false);  // Reject the file
    }
  }
});

const router = express.Router();

// Example route for file upload
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router as default
export default router;
