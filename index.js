import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

const port = process.env.PORT || 5000;

app.set("view engine", "pug");

//Obtener el año actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes";
  next();
});

//Agregar body parse para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

//Definir la carpeta public
app.use(express.static("public"));

app.use("/", router);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
