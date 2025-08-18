const express = require('express');
const multer = require('multer');

// Importing controllers
const {uploadExcelController, getDataController} = require('../controllers/data.controller');

const router = express.Router();
// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route to convert Excel to JSON
router.post('/convert-excel', upload.single("file"), uploadExcelController);

// Route to get data from MongoDB
router.get('/data', getDataController);

// Route to handle Excel file upload and return JSON
module.exports = router;