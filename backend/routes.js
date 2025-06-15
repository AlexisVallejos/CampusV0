import express from "express"

//Router para manejar endpoints
const router = express.Router();

//Ruta raiz con metodo get
router.get("/", (req, res) => {
  res.send("Ruta funcionando")
})

export default router