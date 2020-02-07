const express = require('express');
const router = express.Router();
const tsController = require('../controllers/tsController');

router.route('/schedule').get(tsController.fetchSchedule);
router.route('/schedule').post(tsController.updateSchedule);

module.exports = router;