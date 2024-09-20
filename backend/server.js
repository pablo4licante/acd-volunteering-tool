const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Database } = require("@sqlitecloud/drivers");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const authenticateToken = require('./middleware/JWT'); // Ruta al archivo del middleware

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
    return res.status(400).json({
      error: "Todos los campos son requeridos y horas debe ser un número entero",
    });
  }

  try {
    await database.sql`USE DATABASE volunteerDB; INSERT INTO Actividades (nombre, fecha, horas) VALUES (${nombre}, ${fecha}, ${horas})`;
    res.status(201).json({ message: "Actividad agregada correctamente" });
  } catch (error) {
    console.error("Error al agregar actividad:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todas las actividades
app.get("/actividades", async (req, res) => {
  try {
    const result = await database.sql`USE DATABASE volunteerDB; SELECT * FROM Actividades`;
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
    const result = await database.sql`USE DATABASE volunteerDB; SELECT * FROM Actividades WHERE id = ${id}`;
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
    return res.status(400).json({
      error: "Todos los campos son requeridos y horas debe ser un número entero",
    });
  }

  try {
    await database.sql`USE DATABASE volunteerDB; UPDATE Actividades SET nombre = ${nombre}, fecha = ${fecha}, horas = ${horas} WHERE id = ${id}`;
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
    await database.sql`USE DATABASE volunteerDB; DELETE FROM Actividades WHERE id = ${id}`;
    res.json({ message: "Actividad eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar actividad:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para agregar un voluntario
app.post("/add-voluntario", async (req, res) => {
  const { nombre, apellidos, email, fechaNacimiento, password } = req.body;

  if (!nombre || !apellidos || !email || !fechaNacimiento || !password) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    await database.sql`USE DATABASE volunteerDB; INSERT INTO Voluntarios (nombre, apellidos, email, fechaNacimiento, password, administrador) VALUES (${nombre}, ${apellidos}, ${email}, ${fechaNacimiento}, ${password}, false)`;
    res.status(201).json({ message: "Voluntario agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar voluntario:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los voluntarios
app.get("/voluntarios", async (req, res) => {
  try {
    const result = await database.sql`USE DATABASE volunteerDB; SELECT * FROM Voluntarios`;
    res.json(result);
  } catch (error) {
    console.error("Error al obtener voluntarios:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un voluntario por Email
app.get("/voluntario/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const result = await database.sql`USE DATABASE volunteerDB; SELECT * FROM Voluntarios WHERE email = ${email}`;
    res.json(result);
  } catch (error) {
    console.error("Error al obtener el voluntario:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un voluntario
app.put("/update-voluntario/:email", async (req, res) => {
  const { email } = req.params;
  const { nombre, apellidos, fechaNacimiento, password } = req.body;

  if (!nombre || !apellidos || !fechaNacimiento || !password) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    await database.sql`USE DATABASE volunteerDB; UPDATE Voluntarios SET nombre = ${nombre}, apellidos = ${apellidos}, fechaNacimiento = ${fechaNacimiento}, password = ${password} WHERE email = ${email}`;
    res.json({ message: "Voluntario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar voluntario:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un voluntario
app.delete("/delete-voluntario/:email", async (req, res) => {
  const { email } = req.params;
  try {
    await database.sql`USE DATABASE volunteerDB; DELETE FROM Voluntarios WHERE email = ${email}`;
    res.json({ message: "Voluntario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar voluntario:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para iniciar sesión
const secretKey = 'tu_clave_secreta'; // Reemplaza con tu clave secreta real

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  try {
    const result = await database.sql`USE DATABASE volunteerDB; SELECT * FROM Voluntarios WHERE email = ${email} AND password = ${password}`;
    if (result.length > 0) {
      // Configura la duración del token a 1 mes (30 días)
      const token = jwt.sign({ email: email }, secretKey, { expiresIn: "30d" });
      res.json({ message: "Inicio de sesión exitoso", token: token, success: true });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener información del usuario autenticado
app.get('/get-user-info', authenticateToken, async (req, res) => {
  console.log("Email del usuario autenticado:", req.userEmail); // Registro para depuración

  try {
    const email = req.userEmail; // Extraer el email del middleware
    const result = await database.sql`USE DATABASE volunteerDB; SELECT nombre FROM Voluntarios WHERE email = ${email}`;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const user = result[0]; // Obtener el primer (y único) resultado
    console.log(result[0])
    res.json({
      nombre: user.Nombre // Incluir apellidos si lo necesitas
    });
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  database.sql`USE DATABASE volunteerDB;`;
});
