const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Database } = require("@sqlitecloud/drivers");
const app = express();
const port = 3000;

// Configurar body-parser para manejar datos JSON
app.use(cors());
app.use(bodyParser.json());

// Conectar a SQLite Cloud usando @sqlitecloud/drivers
const database = new Database(
  "sqlitecloud://cjv6oq7rnk.sqlite.cloud:8860?apikey=PtwCHQvq1uv0dFzGTn8W72WgwgrVRan6jb6g8HFEJBI"
);

// Ruta para agregar una actividad
app.post("/add-actividad", async (req, res) => {
  const { nombre, fecha, horas } = req.body;

  if (!nombre || !fecha || !Number.isInteger(horas)) {
    return res
      .status(400)
      .json({
        error:
          "Todos los campos son requeridos y horas debe ser un número entero",
      });
  }

  try {
    await database.sql`INSERT INTO Actividades (nombre, fecha, horas) VALUES (${nombre}, ${fecha}, ${horas})`;
    res.status(201).json({ message: "Actividad agregada correctamente" });
  } catch (error) {
    console.error("Error al agregar actividad:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todas las actividades
app.get("/actividades", async (req, res) => {
  try {
    const result = await database.sql`SELECT * FROM Actividades`;
    res.json(result);
  } catch (error) {
    console.error("Error al obtener actividades:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener una actividad por ID
app.get("/actividad/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result =
      await database.sql`SELECT * FROM Actividades WHERE id = ${id}`;
    res.json(result);
  } catch (error) {
    console.error("Error al obtener la actividad:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar una actividad
app.put("/update-actividad/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, horas } = req.body;

  if (!nombre || !fecha || !Number.isInteger(horas)) {
    return res
      .status(400)
      .json({
        error:
          "Todos los campos son requeridos y horas debe ser un número entero",
      });
  }

  try {
    await database.sql`UPDATE Actividades SET nombre = ${nombre}, fecha = ${fecha}, horas = ${horas} WHERE id = ${id}`;
    res.json({ message: "Actividad actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar actividad:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar una actividad
app.delete("/delete-actividad/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await database.sql`DELETE FROM Actividades WHERE id = ${id}`;
    res.json({ message: "Actividad eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar actividad:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  database.sql`USE DATABASE volunteerDB`;
});
