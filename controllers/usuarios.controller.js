const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const contrasenaHash = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contrasena: contrasenaHash,
      rol
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

// Login de usuario
const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo no registrado' });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Login exitoso', token, nombre: usuario.nombre, rol: usuario.rol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el login' });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario
};
