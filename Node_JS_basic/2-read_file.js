const fs = require('fs');

function countStudents(path) {
  try {
    // Leer el archivo CSV de manera síncrona
    const data = fs.readFileSync(path, 'utf8');

    // Dividir el contenido en líneas y filtrar las vacías
    const lines = data.split('\n').filter(line => line.trim() !== '');

    // Si no hay datos o solo está la cabecera, lanzar un error
    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

    // Eliminar la primera línea (cabecera)
    lines.shift();

    // Variables para contar estudiantes y agrupar por campo
    const studentsByField = {};
    let totalStudents = 0;

    // Procesar cada línea del CSV
    lines.forEach(line => {
      const [firstname, lastname, age, field] = line.split(',');

      // Ignorar líneas que no tienen todos los campos
      if (!firstname || !lastname || !age || !field) {
        return;
      }

      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }

      studentsByField[field].push(firstname);
      totalStudents += 1;
    });

    // Imprimir el número total de estudiantes
    console.log(`Number of students: ${totalStudents}`);

    // Imprimir el número de estudiantes por campo y la lista de nombres
    for (const [field, students] of Object.entries(studentsByField)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }

  } catch (err) {
    console.error('Cannot load the database');
  }
}

module.exports = countStudents;
