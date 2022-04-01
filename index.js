const express = require("express");
const app = express();
const fs = require("fs");



app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});


app.get("/", (req, res) => {
  res.setHeader("Content-type", "text/html");
  fs.readFile("index.html", "utf8", (error, data) => {
    res.end(data);
  });
});

// 1. Crear una ruta que reciba el nombre y precio de un nuevo deporte, lo persista en un
// archivo JSON.
app.use("/agregar", express.json());
app.post("/agregar", (req, res) => {
  const { nombre, precio } = req.body;

  fs.readFile("deportes.json", "utf8", (error, data) => {
    const deportes = JSON.parse(data).deportes;
    deportes.push({ nombre, precio 
    });

  fs.writeFile("deportes.json", JSON.stringify({ deportes }), (error, data) => {
    error ? console.log("error") : console.log("correcto");
    res.end("Deporte agregado con éxito!");
  });
});
});

// 2. Crear una ruta que al consultarse devuelva en formato JSON todos los deportes
// registrados.
app.get("/deportes", (req, res) => {
  fs.readFile("deportes.json", "utf8", (error, data) => {
    res.end(data);
  });
});

// 3. Crear una ruta que edite el precio de un deporte registrado utilizando los parámetros
// de la consulta y persista este cambio.
// /editar
app.use("/editar", express.json());
app.put("/editar", (req, res) => {
  const { nombre, precio } = req.body;

  fs.readFile("deportes.json", "utf8", (error, data) => {
    let deportes = JSON.parse(data).deportes;
    deportes = deportes.map((dep) => {
      if (dep.nombre == nombre) {
        dep.precio = precio;
        return dep;
      }
      return dep;
    });

  fs.writeFile("deportes.json", JSON.stringify({ deportes }), (error, data) => {
    error ? console.log("error") : console.log("correcto");
    res.end("Deporte editado con éxito!");
  });
});
});

// 4. Crear una ruta que elimine un deporte solicitado desde el cliente y persista este
// cambio
// /eliminar
app.delete('/eliminar', (req, res)=>{
    const { nombre } = req.query;
    fs.readFile("deportes.json", "utf8", (error, data) => {
        let deportes = JSON.parse(data).deportes;
        deportes = deportes.filter((dept) =>  dept.nombre !== nombre);
       
        fs.writeFile("deportes.json", JSON.stringify({ deportes }), (error, data) => {
            error ? console.log("error") : console.log("correcto");
            res.end("Deporte eliminado con éxito!");
          });
});
});
