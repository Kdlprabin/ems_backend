const {Router} = require('express');    

const router = Router();

// Importing controllers
const {getStaffData, getStaffNames, getStaffNamesByBranch} = require('../controllers/staff.controller');

// User routes
router.get('/data', getStaffData)
router.get('/staff-name', getStaffNames)
router.post('/staff-name-by-branch', getStaffNamesByBranch)

module.exports = router;