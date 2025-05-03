const mongoose = require('mongoose');

const infografiaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  plantillaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plantilla', required: true },
  imagenes: [{ type: String }], // Array de URLs de imágenes cargadas
  texto: { type: String },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Infografia', infografiaSchema);
