'use strict';

const connectionPromise = require('./connectAMQP');

const q = 'tareas';
const Jimp = require("jimp");
const path = require('path');

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
    //console.log(msg.content.toString());
    var datos = msg.content.toString();
    console.log(datos);
    //console.log(msg);
    // procesamos el mensaje
    Jimp.read(msg.content.path),
      function (err, file) {
        if (err) throw err;
        file.resize(100, 100) // resize
          .quality(80) // set JPEG quality
          .write(path.normalize(__dirname + '/../..') + '../uploads/' + msg.filename + "-small-100x100.jpg"); // save
      };

  });

})().catch(err => {
  console.log(err);
});