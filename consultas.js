const pool = require("./conexion");
const bcrypt = require("bcryptjs");
const format = require('pg-format');

const registrarUsuario = async (usuario) => {
  let { nombre, apellido, email, password } = usuario;
  const passwordEncriptada = bcrypt.hashSync(password);

  try {
    const values = [nombre, apellido, email, passwordEncriptada];
    const consultas = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
    await pool.query(consultas, values);
  } catch (error) {
    console.log(error);
  }
};

const obtenerDatos = async (email) => {
  const values = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1";

  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, values);

  if (!rowCount) {
    throw {
      code: 404,
      message: "No se encontró ningún usuario con este email",
    };
  }

  delete usuario.password;
  return usuario;


};
const loginUsuario = async (email, password) => {
  const values = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1";

  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, values);

  const { password: passwordEncriptada } = usuario;
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

  if (!passwordEsCorrecta || !rowCount)
    throw { code: 401, message: "Email o contraseña incorrecta" };

};


const agregarProducto = async (idUsuario, nombre, precio, imagen, descripcion, categoria, estado) => {
  const consulta = "INSERT INTO productos values (DEFAULT, $1, $2, $3, $4, $5, $6, $7)"
  const values = [idUsuario, nombre, precio, imagen, descripcion, categoria, estado]
  const result = await pool.query(consulta, values)
  console.log("Producto agregado")
}
/////////////////////////////////////////////////////////////////////////////
const eliminarProducto = async (id) => {
  const consulta = "DELETE from productos WHERE id = $1"
  const values = [id]
  const result = await pool.query(consulta, values)
}

const getProductos = async () => {
  try {
    let consulta = "SELECT * FROM productos";
    pool.query(consulta);

    const { rows } = await pool.query(consulta);
    return rows;
  } catch (error) {
    console.log(error)
  }
}

const getMisProductos = async (idUsuario) => {
  try {
    let consulta = "SELECT * FROM productos where idusuario = $1";
    const values = [idUsuario];
    const { rows } = await pool.query(consulta, values);
    return rows;

  } catch (error) {
    console.log(error)
  }
}

/* const filtroProductos = async ({ precio_min, precio_max, categoria, estado }) => {
  let filtros = []
  const values = []

  const agregarFiltro = (campo, comparador, valor) => {
      values.push(valor)
      const { length } = filtros
      filtros.push(`${campo} ${comparador} $${length + 1}`)
  }

  if (precio_min) agregarFiltro('precio', '>=', precio_min)
  if (precio_max) agregarFiltro('precio', '<=', precio_max)
  if (categoria) agregarFiltro('categoria', '=', categoria)
  if (metal) agregarFiltro('metal', '=', estado)

  let consulta = "SELECT * FROM productos"

  if (filtros.length > 0) {
      filtros = filtros.join(" AND ")
      consulta += ` WHERE ${filtros}`
  }
  const { rows: productos } = await pool.query(consulta, values)
  return productos;
}
 */
/////////////////////////////////////////////////////////////////////////////

module.exports = { registrarUsuario, obtenerDatos, loginUsuario, agregarProducto, eliminarProducto, getProductos, getMisProductos }