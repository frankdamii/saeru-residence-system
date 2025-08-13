const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware'); // Solo necesitamos verificar el token
const studentController = require('../controllers/student.controller');

// Esta ruta solo requiere un token válido (de admin o estudiante)
router.get('/my-profile', [verifyToken], studentController.getMyProfile);
router.get('/announcements', [verifyToken], studentController.getAnnouncements);

module.exports = router;