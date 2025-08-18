const {Router} = require('express');

const router = Router();

// Importing routes
const staffRoutes = require('./staff.route');
const dataRoutes = require('./data.route');
const branchRoutes = require('./branch.route');

// Using routes
router.use('/staff', staffRoutes);
router.use('/data', dataRoutes);
router.use('/branch', branchRoutes);

module.exports = router;