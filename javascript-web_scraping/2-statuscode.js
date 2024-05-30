#!/usr/bin/node
const request = require('request');

// Obtener la URL desde los argumentos de la línea de comandos
const url = process.argv[2];

if (!url) {
  console.error('Por favor, proporciona una URL como primer argumento.');
  process.exit(1);
}

// Realizar la solicitud GET
request(url, (error, response, body) => {
  if (error) {
    console.error('Error al realizar la solicitud:', error);
  } else {
    console.log('code:', response.statusCode);
  }
});
