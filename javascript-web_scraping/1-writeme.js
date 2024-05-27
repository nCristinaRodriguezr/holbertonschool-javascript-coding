#!/usr/bin/node
const fs = require('fs');

// Obtener la ruta del archivo y la cadena de los argumentos de la línea de comandos
const filePath = process.argv[2];
const stringToWrite = process.argv[3];

if (!filePath || !stringToWrite) {
  console.error('Por favor, proporciona la ruta del archivo como primer argumento y la cadena a escribir como segundo argumento.');
  process.exit(1);
}

// Escribir la cadena en el archivo
fs.writeFile(filePath, stringToWrite, { encoding: 'utf-8' }, (err) => {
  if (err) {
    console.error(err);
  }
});
