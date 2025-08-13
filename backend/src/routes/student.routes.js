const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const studentController = require('../controllers/student.controller');

router.get('/my-profile', [verifyToken], studentController.getMyProfile);
router.get('/announcements', [verifyToken], studentController.getAnnouncements);

module.exports = router;