const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Leer el archivo CSV de manera asíncrona
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        // Dividir el contenido en líneas y filtrar las vacías
        const lines = data.split('\n').filter(line => line.trim() !== '');

        // Eliminar la primera línea (cabecera)
        lines.shift();

        // Variables para contar estudiantes y agrupar por campo
        const studentsByField = {};
        let totalStudents = 0;

        // Procesar cada línea del CSV
        lines.forEach(line => {
          const [firstname, lastname, age, field] = line.split(',');

          // Ignorar líneas que no tienen todos los campos
          if (firstname && lastname && age && field) {
            if (!studentsByField[field]) {
              studentsByField[field] = [];
            }
            studentsByField[field].push(firstname);
            totalStudents += 1;
          }
        });

        // Construir el resultado
        const result = {
          totalStudents: totalStudents,
          studentsByField: studentsByField
        };

        // Imprimir el número total de estudiantes
        console.log(`Number of students: ${result.totalStudents}`);

        // Imprimir el número de estudiantes por campo y la lista de nombres
        for (const [field, students] of Object.entries(result.studentsByField)) {
          console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
        }

        // Resuelve la promesa con el resultado
        resolve(result);
      }
    });
  });
}

module.exports = countStudents;
