"use strict";
var express = require("express");
var router = express.Router();
const i18n = require('../lib/i18nConfigure')();
const sessionAuth = require('../lib/sessionAuth');
const Usuario = require('../models/Usuario');
const upload = require('../lib/uploadConfig');
const path = require('path');
var publisher = require('../lib/publisher');


// Se carga el modelo
const Anuncio = require("../models/Anuncio");

// Se cargan las librerías de validaciones
const {
  query,
  validationResult
} = require("express-validator/check");


router.get('/', sessionAuth(), function (req, res, next) {
  console.log(req.session.authUser);

  /*  if (!req.session.authUser) {
     res.redirect('/login');
     return;
   } */
  //Se renderiza
  res.render('index', {
    title: 'Nodepop'
  });
});

router.get('/crear', sessionAuth(), function (req, res, next) {
  res.render('crear');
});


router.post('/sendemail', sessionAuth(), async (req, res, next) => {
  try {

    await req.user.sendMail('Nodeapi', 'Asunto de prueba', 'Correo de prueba');

    res.redirect('/');
  } catch (err) {
    next(err);
    return;
  }
});

router.post('/upload', sessionAuth(), upload.single('imagen'), (req, res, next) => {

  var anuevo = new Anuncio();
  anuevo.nombre = req.body.nombre;
  anuevo.estado = req.body.isSale;
  anuevo.precio = req.body.precio;
  anuevo.foto = req.file.filename;
  anuevo.tags = req.body.tags;
  anuevo.save();
  //console.log(req.file);
  console.log('uploaden index:', req.file);
  publisher(req.file)
  res.redirect('/');
});


// Listado de anuncios HTML
// Con sessionAuth se especifica si es necesario iniciar sesión para entrar
router.get('/anuncios', sessionAuth(), async (req, res, next) => {

  //console.log(req.session.authUser);

  // Redigir al login si no está autenticado
  /*  if (!req.session.authUser) {
     res.redirect('/login');
     return;
   } */

  // Con async/await
  try {

    // Se recogen los parámetros de entrada
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tags;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const fields = req.query.fields;

    // Filtro vacío inicial
    const filtro = {};

    // Filtrar por nombre
    if (typeof nombre !== 'undefined') {
      // Se añade el nombre (por el que empiece) al filtro
      filtro.nombre = new RegExp('^' + nombre, "i");
    }

    // Filtrar por tipo de anuncio (true -> venta / false -> búsqueda)
    if (typeof venta !== 'undefined') {
      // Se añade el tipo de anuncio al filtro
      filtro.venta = venta;
    }

    // Filtrar por precio
    if (typeof precio !== 'undefined') {
      // Se filtra por precio
      filtro.precio = filtrarPrecio(precio);
    }

    // Filtrar por tags
    if (typeof tags !== 'undefined') {
      // Se introduce dentro de un vector el tag buscado
      filtro.tags = [tags];

      // Se comprueba si el tag está dentro de los tags de la base de datos
      filtro.tags = {
        $in: filtro.tags
      };
    }

    // La función debe ser asíncrona si se usa await
    const docs = await Anuncio.listar(filtro, skip, limit, sort, fields);

    // Se le pasan los resultados a la vista
    res.locals.anuncios = docs;

    // Se renderiza
    res.render('anuncios', {
      title: 'Nodepop'
    });

  } catch (err) {
    next(err);
    return;
  }
});

// Función para filtrar por precio
function filtrarPrecio(precio) {

  // Rango entre x-y ( > x && < y )
  if (/^[0-9]+\-[0-9]+$/.test(precio)) {
    return {
      '$gte': parseInt(precio.split('-')[0]),
      '$lte': parseInt(precio.split('-')[1])
    };
  }

  // Rango entre x- ( > x )
  if (/^[0-9]+\-$/.test(precio)) {
    return {
      '$gte': parseInt(precio.match(/[0-9]+/))
    };
  }

  // Rango entre -y ( < y )
  if (/^-[0-9]+$/.test(precio)) {
    return {
      '$lte': parseInt(precio.match(/[0-9]+/))
    };
  }

  return parseInt(precio);
}
module.exports = router;