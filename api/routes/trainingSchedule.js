const express = require('express');
const router = express.Router();
const tsController = require('../controllers/tsController');

router.route('/schedule').get(tsController.fetchSchedule);
router.route('/updateExcercise').post(tsController.updateExcercise);
router.route('/insertExcercise').post(tsController.insertExcercise);
router.route('/deleteExcercise').delete(tsController.deleteExcercise);
router.route('/excerciseNames').get(tsController.fetchNames);
router.route('/insertName').post(tsController.insertName);
router.route('/deleteName').delete(tsController.deleteName);

module.exports = router;