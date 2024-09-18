const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configurar body-parser para manejar datos JSON
app.use(bodyParser.json());

// Configuración de SQLite Cloud
const baseURL = 'https://cjv6oq7rnk.sqlite.cloud:8860'; // URL base para SQLite Cloud
const apiKey = 'PtwCHQvq1uv0dFzGTn8W72WgwgrVRan6jb6g8HFEJBI'; // Tu API key

// Ruta para agregar una actividad
app.post('/add-actividad', async (req, res) => {
  const { nombre, fecha, horas } = req.body;

  if (!nombre || !fecha || !Number.isInteger(horas)) {
    return res.status(400).json({ error: 'Todos los campos son requeridos y horas debe ser un número entero' });
  }

  try {
    const response = await axios.post(`${baseURL}/query`, {
      query: 'INSERT INTO Actividades (nombre, fecha, horas) VALUES (?, ?, ?)',
      params: [nombre, fecha, horas]
    }, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    res.status(201).json({ message: 'Actividad agregada correctamente', response: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
