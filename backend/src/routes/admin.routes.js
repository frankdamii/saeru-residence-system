const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');

// ... (rutas anteriores sin cambios)
router.get('/applications', [verifyToken, isAdmin], adminController.getAllApplications);
router.get('/applications/:id', [verifyToken, isAdmin], adminController.getApplicationById);
router.put('/applications/:id/status', [verifyToken, isAdmin], adminController.updateApplicationStatus);
router.get('/residents', [verifyToken, isAdmin], adminController.getAllResidents);
router.get('/residents/:id', [verifyToken, isAdmin], adminController.getResidentById);
router.put('/residents/:id/status', [verifyToken, isAdmin], adminController.updateResidentStatus);
router.get('/habitations/available', [verifyToken, isAdmin], adminController.getAvailableHabitations);
router.get('/residences', [verifyToken, isAdmin], adminController.getAllResidences);

// --- ¡NUEVAS RUTAS CRUD! ---
router.post('/residences', [verifyToken, isAdmin], adminController.createResidence);
router.post('/habitations', [verifyToken, isAdmin], adminController.createHabitation);
router.delete('/habitations/:id', [verifyToken, isAdmin], adminController.deleteHabitation);
router.get('/dashboard-stats', [verifyToken, isAdmin], adminController.getDashboardStats);
router.post('/announcements', [verifyToken, isAdmin], adminController.createAnnouncement);
router.get('/announcements', [verifyToken, isAdmin], adminController.getAnnouncements);

module.exports = router;