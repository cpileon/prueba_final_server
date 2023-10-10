CREATE TABLE usuarios (id SERIAL unique, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL,  email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL);
DROP TABLE usuarios

select * from usuarios
DELETE FROM usuarios WHERE id=2

CREATE TABLE productos ( id SERIAL PRIMARY KEY, idUsuario INTEGER REFERENCES usuarios(id), nombre VARCHAR(100), precio INTEGER, imagen VARCHAR(500), descripcion VARCHAR(1000), categoria VARCHAR (25), estado VARCHAR(25));
select * from productos