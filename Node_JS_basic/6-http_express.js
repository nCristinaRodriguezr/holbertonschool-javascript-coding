const express = require('express');

// Crea una aplicación de Express
const app = express();

// Define una ruta para el endpoint "/"
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Configura el servidor para escuchar en el puerto 1245
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporta la aplicación para que pueda ser utilizada en otros archivos
module.exports = app;
