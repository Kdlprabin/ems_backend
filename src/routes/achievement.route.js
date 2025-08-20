const {Router} = require('express');    

const router = Router();

// Importing controllers
const {getAchieveData, deleteAchieve} = require('../controllers/achievement.controller');

// User routes
router.get('/data', getAchieveData)
router.delete('/delete', deleteAchieve)

module.exports = router;