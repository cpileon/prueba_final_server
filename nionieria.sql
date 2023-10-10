CREATE TABLE usuarios (id SERIAL unique, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL,  email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL);
DROP TABLE usuarios

select * from usuarios
DELETE FROM usuarios WHERE id=2

CREATE TABLE productos ( id SERIAL PRIMARY KEY, idUsuario INTEGER REFERENCES usuarios(id), nombre VARCHAR(100), precio INTEGER, imagen VARCHAR(500), descripcion VARCHAR(1000), categoria VARCHAR (25), estado VARCHAR(25));
select * from productos

INSERT INTO productos (idUsuario, nombre, precio, imagen, descripcion, categoria, estado) values (1, 'kirby', 5950, 'https://i.ebayimg.com/thumbs/images/g/lHEAAOSwO25k37F~/s-l640.jpg', 'Juego de kirby para consola SNES', 'Videojuego', 'Usado/ como nuevo')
INSERT INTO productos (idUsuario, nombre, precio, imagen, descripcion, categoria, estado) values (1, 'Donkey Kong Country', 7250, 'https://i.ebayimg.com/images/g/QP0AAOSw0JNjYHdE/s-l1600.jpg', 'Juego de DK para SNES', 'Videojuego', 'Usado/ como nuevo')
INSERT INTO productos (idUsuario, nombre, precio, imagen, descripcion, categoria, estado) values (1, 'Luffy - Figura a escala', 5990, 'https://i.ebayimg.com/images/g/F6MAAOSwa~JbNeR1/s-l500.jpg', 'Figurita a escala de Luffy, serie One Piece', 'Figura coleccionable', 'Usado/ con detalles')
INSERT INTO productos (idUsuario, nombre, precio, imagen, descripcion, categoria, estado) values (1, 'BOX SET BOOSTERS MAGIC', 9590, 'https://mesa1.cl/cdn/shop/files/MTGLTR_EN_BstrDspBx_Set_01_03_800x.jpg', 'Set booster TCG Magic Edición Universes Beyond - 75 sobres', 'Juego de cartas', 'Nuevo')
INSERT INTO productos (idUsuario, nombre, precio, imagen, descripcion, categoria, estado) values (1, 'PIN Pikachu sorprendido', 6450, 'https://i.etsyestadoic.com/17983530/r/il/97f75b/3609667426/il_fullxfull.3609667426_jnl2.jpg', 'Pin de Pikachu sorprendido, igualito al meme.', 'Accesorio', 'Nuevo')
INSERT INTO productos (idUsuario, nombre, precio, imagen, descripcion, categoria, estado) values (1, 'Polera Sailor Moon', 8500, 'https://m.media-amazon.com/images/I/61kNGtpyc8L._AC_UX522_.jpg', 'Polera modificada de Sailor Moon - Uniforme de escuela de Serena - Talla S.', 'Accesorio', 'Usado / con detalles')
