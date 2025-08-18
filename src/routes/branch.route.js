const {Router} = require('express');    

const router = Router();

// Importing controllers
const {getBranch} = require('../controllers/branch.controller');

// Route to get branch data
router.get('/branches', getBranch);

module.exports = router;