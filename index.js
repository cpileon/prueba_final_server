const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express();

const { registrarUsuario, obtenerDatos, loginUsuario, agregarProducto, eliminarProducto, getProductos, getMisProductos } = require("./consultas");
const { reportarConsultas, chequeoToken, chequeoCredenciales } = require('./middlewares');
const PORT = process.env.PORT || 3000;

//middlewares
app.use(reportarConsultas);
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Servidor encendido en puerto ${PORT}`);
})

app.post('/usuarios', chequeoCredenciales, async (req, res) => {
  try {
    const usuario = req.body;
    await registrarUsuario(usuario);
    return res.send('Usuario registrado');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/usuarios", chequeoToken, async (req, res) => {
  try {
    const token = req.header("Authorization").split("Bearer ")[1];
    const { email } = jwt.decode(token);
    const usuario = await obtenerDatos(email);
    res.json(usuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await loginUsuario(email, password);
    const token = jwt.sign({ email }, process.env.SECRET);
    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.post("/publicar", async (req, res) => {
  try {
    const { idUsuario, nombre, precio, imagen, descripcion, categoria, estado } = req.body
    await agregarProducto(idUsuario, nombre, precio, imagen, descripcion, categoria, estado)
    res.send("Producto agregado con éxito")
  } catch (error) {
    console.log(error)
    const { code } = error
    if (code == "23502") {
      res.status(400).send("Uno o más campos son nulos o no válidos");
    } else {
      res.status(500).send("Error interno del servidor");
    }
  }
})

app.get("/productos", reportarConsultas, async (req, res) => {
  try {
    const productos = await getProductos();
    console.log(productos)
    res.json(productos)

  } catch (error) {
    res.status(500).send(error)
  }
});


app.delete("/producto/:id", async (req, res) => {
  const { id } = req.params
  await eliminarProducto(id)
  res.send("Producto eliminado con éxito")
})

app.get("/misproductos", reportarConsultas, async (req, res) => {
  try {
    const misProductos = await getMisProductos();
    console.log(misProductos)
    res.json(misProductos)

  } catch (error) {
    res.status(500).send(error)
  }
});