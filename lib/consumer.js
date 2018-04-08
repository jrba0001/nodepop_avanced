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
    var datos = JSON.parse(msg.content.toString());
    // procesamos el mensaje
    Jimp.read(datos.tarea.path),
      function (err, file) {
        if (err) throw err;
        file.resize(100, 100) // resize
          .quality(80) // set JPEG quality
          .write(datos.tarea.destination + '/' + 'thum_' + datos.tarea.filename); // save
      };
    ch.ack(msg);
  });

})().catch(err => {
  console.log(err);

});