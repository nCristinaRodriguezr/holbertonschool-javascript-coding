#!/usr/bin/node
const fs = require('fs');

// Obtener la ruta del archivo desde los argumentos de la línea de comandos
const filePath = process.argv[2];

if (!filePath) {
  console.error('Por favor, proporciona la ruta del archivo como primer argumento.');
  process.exit(1);
}

// Leer el archivo y mostrar su contenido
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
