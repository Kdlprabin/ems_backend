const {Router} = require('express');    

const router = Router();

// Importing controllers
const {getEmployeesTarget} = require("../controllers/target.controller.js")

// User routes
router.get('/employee-target', getEmployeesTarget)

module.exports = router;