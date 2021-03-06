'use strict';

const connectionPromise = require('./connectAMQP');

const q = 'tareas';
module.exports = function (file) {

  // IIFE - Inmediatelly Invoked Function Expression
  (async () => {

    // nos aseguramos de estar conectados
    const conn = await connectionPromise;

    // conectarnos a un canal
    const ch = await conn.createChannel();

    // conectar a una cola
    await ch.assertQueue(q, {
      durable: true // la cola sobrevive a reinicios
    });

    const mensaje = {
      tarea: file
    };

    // mandar mensaje
    const res = ch.sendToQueue(q, new Buffer(JSON.stringify(mensaje)), {
      persistent: true // el mensaje sobrevive a reinicios
    });
    console.log(`publicado: ${mensaje.tarea} ${res}`);


  })().catch(err => {
    console.log(err);
  });
};

/* 'use strict';

const connectionPromise = require('./connectAMQP');

const q = 'tareas';
module.exports = function (file) {
  // IIFE - Inmediatelly Invoked Function Expression
  (async () => {

    // nos aseguramos de estar conectados
    const conn = await connectionPromise;

    // conectarnos a un canal
    const ch = await conn.createChannel();

    // conectar a una cola
    await ch.assertQueue(q, {
      durable: true // la cola sobrevive a reinicios
    });
    const mensaje = {
      tarea: file
    };
    const res = ch.sendToQueue(q, new Buffer(JSON.stringify(mensaje)), {
      persistent: true // el mensaje sobrevive a reinicios
    });
    console.log(`publicado: ${mensaje.tarea} ${res}`);

  })().catch(err => {
    console.log("error");
  });
  return;
} */