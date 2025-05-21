const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario,
  obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario,
  eliminarUsuario } = require('../controllers/usuarios.controller');

// Ruta para registrar usuarios
router.post('/', registrarUsuario);
// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);
// Ruta para obtener un usuario por ID
router.get('/:id', obtenerUsuarioPorId);
// Ruta para actualizar un usuario por ID
router.put('/:id', actualizarUsuario);
// Ruta para eliminar un usuario por ID
router.delete('/:id', eliminarUsuario);
// Ruta para verificar un usuario por ID
//router.put('/verificar/:id', verificarUsuario);

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

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contrasena'); // Excluye la contraseña
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});