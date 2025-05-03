const express = require('express');
const router = express.Router();
const { crearInfografia, obtenerInfografias, obtenerInfografia, actualizarInfografia, eliminarInfografia } = require('../controllers/infografias.controller');

// Crear una infografía
router.post('/', crearInfografia);

// Obtener todas las infografías
router.get('/', obtenerInfografias);

// Obtener infografía por ID
router.get('/:id', obtenerInfografia);

// Actualizar infografía
router.put('/:id', actualizarInfografia);

// Eliminar infografía
router.delete('/:id', eliminarInfografia);

module.exports = router;
