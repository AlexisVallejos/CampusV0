/** Cambie un par de cositas para tener todo mejor, les diria que los endpoints los manejen con express.router como hago aca
 *  Cambie las importaciones de los modules a import para que sea más comodo
 *  Les recomiendo que dividan las rutas para que las tengan ordenadas, las pueden dividir por metodo HTTP o por funcionalidad
 *  Por ejemplo separar todas las rutas get de las post en distintos archivos
 *  O todas las rutas que hagan una peticion a la base de datos en otro archivo y las que no vayan en otro
 *  
 *  Les recomiendo tambien que piensen en algun patron de diseño para tener todas las entidades ordenadas tambien
 *  Las que más se usan son el MVC (Modelo Vista Controlador) o arquitectura hexagonal
 *  En el caso del MVC la vista no la toman porque es el frontend.
 *  Para los modelos crean clases que representen las tablas en la base de datos
 *  El controlador maneja las peticiones y respuestas de la API y hace consultas a la base de datos
 * 
 *  En la hexagonal es más compleja pero hace mejor la division de responsabilidades
 * 
 *  Seria ideal si sacan el .env del repositorio, lo tienen que agregar al .gitignore porque les van a robar las credenciales
 *  
 *  Cualquier cosa que necesiten me avisan, aca les deje un ejemplo de como usar el express router
*/





//Cambiado los require de CommonJS a import 
import express from "express"
import dotenv from "dotenv";
import { pool } from "./db.js"
import router from "./routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

//Middleware para utilizar las rutas
app.use("/api", router);

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'Conectado', result: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
