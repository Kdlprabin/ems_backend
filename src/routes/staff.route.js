const {Router} = require('express');    

const router = Router();

// Importing controllers
const {getStaffData, getStaffNames, getStaffNamesByBranch, deleteStaff, login} = require('../controllers/staff.controller');

// User routes
router.get('/data', getStaffData)
router.get('/staff-name', getStaffNames)
router.post('/staff-name-by-branch', getStaffNamesByBranch)
router.delete('/delete', deleteStaff)
router.post('/login', login)

module.exports = router;