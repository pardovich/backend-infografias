const Infografia = require('../models/Infografia');

// Crear infografía
const crearInfografia = async (req, res) => {
  try {
    const { titulo, descripcion, plantillaId, imagenes, texto } = req.body;

    const nuevaInfografia = new Infografia({
      titulo,
      descripcion,
      plantillaId,
      imagenes,
      texto
    });

    await nuevaInfografia.save();
    res.status(201).json({ mensaje: 'Infografía creada exitosamente', infografia: nuevaInfografia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear infografía' });
  }
};

// Obtener todas las infografías
const obtenerInfografias = async (req, res) => {
  try {
    const infografias = await Infografia.find().populate('plantillaId');
    res.json(infografias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener infografías' });
  }
};

// Obtener infografía por ID
const obtenerInfografia = async (req, res) => {
  try {
    const infografia = await Infografia.findById(req.params.id).populate('plantillaId');
    if (!infografia) {
      return res.status(404).json({ mensaje: 'Infografía no encontrada' });
    }
    res.json(infografia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener infografía' });
  }
};

// Actualizar infografía
const actualizarInfografia = async (req, res) => {
  try {
    const { titulo, descripcion, plantillaId, imagenes, texto } = req.body;

    const infografiaActualizada = await Infografia.findByIdAndUpdate(
      req.params.id,
      { titulo, descripcion, plantillaId, imagenes, texto },
      { new: true }
    );

    if (!infografiaActualizada) {
      return res.status(404).json({ mensaje: 'Infografía no encontrada' });
    }

    res.json({ mensaje: 'Infografía actualizada', infografia: infografiaActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar infografía' });
  }
};

// Eliminar infografía
const eliminarInfografia = async (req, res) => {
  try {
    const infografiaEliminada = await Infografia.findByIdAndDelete(req.params.id);
    if (!infografiaEliminada) {
      return res.status(404).json({ mensaje: 'Infografía no encontrada' });
    }
    res.json({ mensaje: 'Infografía eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar infografía' });
  }
};

module.exports = {
  crearInfografia,
  obtenerInfografias,
  obtenerInfografia,
  actualizarInfografia,
  eliminarInfografia
};
