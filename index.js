const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express();

const { registrarUsuario, obtenerDatos, loginUsuario } = require("./consultas");
const { reportarConsultas, chequeoToken, chequeoCredenciales, getProductos, agregarProducto, eliminarProducto } = require('./middlewares');
const PORT = process.env.PORT || 3000;

const prepararHATEOAS = (productos) => {
  const results = productos.map((j) => {
      return {
          name: p.nombre,
          href: `/productos/producto/${j.id}`,
      }
  })
  const totalProductos = productos.length
  const stockTotal = productos.reduce((totalStock, producto) => totalStock + producto.stock, 0)
  const HATEOAS = {
      totalProductos,
      stockTotal,
      results
  }
  return HATEOAS
}

//middlewares
app.use(reportarConsultas);
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Servidor encendido en puerto ${PORT}`);
})

app.post('/usuarios', chequeoCredenciales, async (req, res) =>{
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
        const { idUsuario, nombre, precio, stock, imagen, descripcion, categoria, estado } = req.body
        await agregarProducto(idUsuario, nombre, precio, stock, imagen, descripcion, categoria, estado)
        res.send("Producto agregado con éxito")
    } catch (error) {
        const { code } = error
        if (code == "23502") {
            res.status(400)
                .send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

  app.get("/productos", reportarConsultas, async (req, res) => {
    try {
        const queryStrings = req.query;
        console.log(queryStrings)
        const productos = await getProductos(queryStrings);
        const HATEOAS = prepararHATEOAS(productos)
        return res.json(HATEOAS);
    } catch (error) {
        res.status(500).send(error)
    }
});

app.delete("/producto/:id", async (req, res) => {
  const { id } = req.params
  await eliminarProducto(id)
  res.send("Producto eliminado con éxito")
})
  