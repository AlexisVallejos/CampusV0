const express = require('express');
const dotenv = require('dotenv');
const pool = require('./db');

dotenv.config();

const app = express();
app.use(express.json());

// Ruta de prueba para verificar conexión
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'Conectado', result: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
