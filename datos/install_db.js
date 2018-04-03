"use strict";

//conexion con BD host en localhost:27017
var conn = new Mongo("localhost:27017");

//Nombre de la Base de Datos
var db = conn.getDB("nodepopdb");

//elimina BD. Se elimina toda la información que pueda contener la Base de Datos
db.dropDatabase();

//Creación de la Base de Datos
db.getSiblingDB("nodepopdb");

//Se crean las colecciones de la Base de Datos
db.createCollection("anuncios");

//cargar datos
var fileInsertDBAnuncios = cat("./datos/anuncios.json");
var anuncios_json = JSON.parse(fileInsertDBAnuncios);
db.anuncios.insert(anuncios_json);
db.anuncios.ensureIndex({ nombre: 1 });
db.anuncios.ensureIndex({ estado: 1 });
db.anuncios.ensureIndex({ precios: 1 });
db.anuncios.ensureIndex({ tags: 1 });
