const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor backend funcionando correctamente!');
});

// Conexión a MongoDB (temporal, sin clave todavía)
mongoose.connect('mongodb://localhost:27017/infografias', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexión a MongoDB exitosa');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const infografiasRoutes = require('./routes/infografias.routes');
const plantillasRoutes = require('./routes/plantillas.routes');

// Rutas
app.use('/infografias', infografiasRoutes);
app.use('/plantillas', plantillasRoutes);
