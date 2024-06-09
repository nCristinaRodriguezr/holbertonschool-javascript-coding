const http = require('http');
const fs = require('fs');

// Define la función countStudents para procesar el archivo CSV
function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter(line => line.trim() !== '');
        lines.shift(); // Eliminar la primera línea (cabecera)

        const studentsByField = {};
        let totalStudents = 0;

        lines.forEach(line => {
          const [firstname, lastname, age, field] = line.split(',');
          if (firstname && lastname && age && field) {
            if (!studentsByField[field]) {
              studentsByField[field] = [];
            }
            studentsByField[field].push(firstname);
            totalStudents += 1;
          }
        });

        const result = {
          totalStudents: totalStudents,
          studentsByField: studentsByField
        };

        resolve(result);
      }
    });
  });
}

// Crea el servidor
const app = http.createServer((req, res) => {
  // Configura la respuesta HTTP con el código de estado 200 (OK) y el tipo de contenido de texto plano
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Maneja la solicitud según la ruta
  if (req.url === '/') {
    // Para la ruta /, responde con "Hello Holberton School!"
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // Para la ruta /students, responde con "This is the list of our students" seguido por los datos de los estudiantes
    const databasePath = process.argv[2];
    countStudents(databasePath)
      .then((result) => {
        let response = 'This is the list of our students\n';
        // Imprimir el número de estudiantes por campo y la lista de nombres
        for (const [field, students] of Object.entries(result.studentsByField)) {
          response += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
        }
        res.end(response);
      })
      .catch(() => {
        res.writeHead(500);
        res.end('Cannot load the database');
      });
  } else {
    // Para cualquier otra ruta, responde con un mensaje de error
    res.end('Error: Invalid path');
  }
});

// Escucha en el puerto 1245
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporta el servidor para que pueda ser utilizado en otros archivos
module.exports = app;
