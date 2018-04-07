'use strict';

const amqplib = require('amqplib'); // 'amqplib/callback_api'

// carga de variables de entorno desde .env
require('dotenv').config();

const url = process.env.AMQP_URL || 'amqp://gtfvcaoz:nZa2ycS_SRBmSwjQCbZfghNG8lKh7xNo@hound.rmq.cloudamqp.com/gtfvcaoz';

const connectionPromise = amqplib.connect(url)
  .catch(err => {
    console.log('[AMQP]', err);
  });

module.exports = connectionPromise;