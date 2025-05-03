const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/usuarios.controller');

// Ruta para registrar usuarios
router.post('/', registrarUsuario);

// Ruta para login
router.post('/login', loginUsuario);

module.exports = router;

const verifyToken = require('../middlewares/verifyToken');

router.get('/protegido', verifyToken, (req, res) => {
  res.json({ mensaje: `Hola ${req.user.nombre}, accediste a una ruta protegida`, datos: req.user });
});

const isAdmin = require('../middlewares/isAdmin');

router.get('/solo-admin', verifyToken, isAdmin, (req, res) => {
  res.json({ mensaje: `Hola ${req.user.nombre}, tienes acceso de administrador` });
});
