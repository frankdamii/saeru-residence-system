const express = require('express');
const router = express.Router();
// Importamos la función 'login' directamente usando desestructuración
const { login } = require('../controllers/auth.controller');

router.post('/login', login);

module.exports = router;
