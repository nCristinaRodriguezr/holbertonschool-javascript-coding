const express = require('express');
const countStudents = require('./3-read_file_async');

// Crea una aplicación de Express
const app = express();

// Define una ruta para el endpoint "/"
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define una ruta para el endpoint "/students"
app.get('/students', (req, res) => {
  const databasePath = process.argv[2];

  countStudents(databasePath)
    .then((result) => {
      let responseText = 'This is the list of our students\n';
      responseText += `Number of students: ${result.totalStudents}\n`;

      // Imprimir el número de estudiantes por campo y la lista de nombres
      for (const [field, students] of Object.entries(result.studentsByField)) {
        responseText += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }

      res.send(responseText.trim());  // trim() para eliminar el último salto de línea
    })
    .catch(() => {
      res.send('Cannot load the database');
    });
});

// Configura el servidor para escuchar en el puerto 1245
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporta la aplicación para que pueda ser utilizada en otros archivos
module.exports = app;
