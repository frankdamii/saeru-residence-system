const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const upload = require('../config/multer.config');

// Multer espera campos con estos nombres desde el frontend
const applicationUpload = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'enrollmentProof', maxCount: 1 },
    { name: 'entrySlip', maxCount: 1 },
    { name: 'paymentReceipt', maxCount: 1 }
]);

router.post('/', applicationUpload, applicationController.createApplication);

module.exports = router;