'use strict';

const connectionPromise = require('./connectAMQP');

const q = 'tareas';
const Jimp = require("jimp");
const path = require('path');
const anuncio = require("../models/Anuncio");


// IIFE - Inmediatelly Invoked Function Expression
(async () => {

  // nos aseguramos de estar conectados
  const conn = await connectionPromise;

  // conectarnos a un canal
  const ch = await conn.createChannel();

  // conectar a una cola
  await ch.assertQueue(q, {});

  // le decimos al canal
  // cuantos mensajes puedo procesar
  // en paralelo
  ch.prefetch(1);

  await ch.consume(q, msg => {
    console.log(msg.content.toString());
    Jimp.read(path.normalize(__dirname + '/../..') + '../uploads/' + msg.file.filename, function (err, file) {
      if (err) throw err;
      file.resize(100, 100) // resize
        .quality(80) // set JPEG quality
        .write(path.normalize(__dirname + '/../..') + '../uploads/' + msg.file.filename + "-small-100x100.jpg"); // save
    });
    const Anuncio = new anuncio();
    Anuncio.nombre = req.body.nombre;
    Anuncio.estado = req.body.isSale;
    Anuncio.precio = req.body.precio;
    Anuncio.foto = req.file.filename + "-small-100x100.jpg";
    Anuncio.tags = req.body.tags;
    Anuncio.save((err, savedAdvertisement) => {
      if (err) {
        console.log('/*************/');
        console.log('Error', err);
        console.log('/*************/');
        next(err);
        return
      }
      res.json({
        ok: true,
        result: savedAdvertisement
      });

    });
    // procesamos el mensaje
    setTimeout(() => { // simulamos un trabajo
      // hemos terminado de procesar
      // confirmamos a rabbit que está procesado
      ch.ack(msg);
    }, 100);
  });

})().catch(err => {
  console.log(err);
});