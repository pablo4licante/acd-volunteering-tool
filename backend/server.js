const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configurar body-parser para manejar datos JSON
app.use(bodyParser.json());

// Configurar la base de datos
const db = new sqlite3.Database('sqlitecloud://cjv6oq7rnk.sqlite.cloud:8860?apikey=PtwCHQvq1uv0dFzGTn8W72WgwgrVRan6jb6g8HFEJBI');

// Crear la tabla si no existe
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Actividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    fecha TEXT NOT NULL,
    horas INTEGER NOT NULL
  )`);
});

// Ruta para agregar una actividad
app.post('/add-actividad', (req, res) => {
  const { nombre, fecha, horas } = req.body;

  if (!nombre || !fecha || !Number.isInteger(horas)) {
    return res.status(400).json({ error: 'Todos los campos son requeridos y horas debe ser un número entero' });
  }

  const sql = 'INSERT INTO Actividades (nombre, fecha, horas) VALUES (?, ?, ?)';
  db.run(sql, [nombre, fecha, horas], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Actividad agregada correctamente' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
