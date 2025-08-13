const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./src/models');

// --- Importar rutas ---
const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
const applicationRoutes = require('./src/routes/application.routes');
const studentRoutes = require('./src/routes/student.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

// --- Usar las rutas ---
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/student', studentRoutes);

app.get('/', (req, res) => {
  res.json({ message: '¡Bienvenido a la API de SAERU! 🚀' });
});

const PORT = process.env.SERVER_PORT || 3000;

async function startServer() {
  try {
    await db.sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados con la base de datos.');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();

