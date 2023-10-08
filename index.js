const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express();

const { registrarUsuario, obtenerDatos, loginUsuario } = require("./consultas");
const { reportarConsultas, chequeoToken, chequeoCredenciales } = require('./middlewares');
const PORT = process.env.PORT || 3000;

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
  