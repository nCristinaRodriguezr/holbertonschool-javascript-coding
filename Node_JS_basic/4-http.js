const http = require('http');

// Crea el servidor
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Envía "Hello Holberton School!" como respuesta
  res.end('Hello Holberton School!');
});

// Escucha en el puerto 1245
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporta el servidor para que pueda ser utilizado en otros archivos
module.exports = app;
