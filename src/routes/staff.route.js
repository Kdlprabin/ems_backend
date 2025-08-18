const {Router} = require('express');    

const router = Router();

// Importing controllers
const {getStaffData} = require('../controllers/staff.controller');

// User routes
router.get('/data', getStaffData)

module.exports = router;