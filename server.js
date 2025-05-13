const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());  // Para habilitar solicitudes desde otros dominios
app.use(express.json());  // Para parsear el cuerpo de las solicitudes JSON

const port = 3001;

require('dotenv').config();
// Middleware para verificar el token JWT

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/infografias', {
})
.then(() => console.log('Conectado a MongoDB - API de Infografías'))
.catch((err) => console.error('Error conectando a MongoDB:', err));
 
//ruta usuarios
const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/api/usuarios', usuariosRoutes);

// Definir un esquema para las infografías
const infografiaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagen: String,
  texto: String,
  fechaCreacion: { type: Date, default: Date.now }
});

const Infografia = mongoose.model('Infografia', infografiaSchema);

// Endpoint para obtener todas las infografías
app.get('/infografias', async (req, res) => {
  try {
    const infografias = await Infografia.find();
    res.json(infografias);
  } catch (err) {
    console.error('Error al obtener infografías:', err);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(port, () => {
  console.log(`API ejecutándose en http://localhost:${port}`);
});
