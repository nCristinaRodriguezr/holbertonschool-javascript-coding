import fs from 'fs/promises';

async function readDatabase(filePath) {
  try {
    // Leer el archivo de forma asíncrona
    const data = await fs.readFile(filePath, 'utf8');

    // Dividir el contenido en líneas y filtrar las vacías
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    // Eliminar la primera línea (cabecera)
    lines.shift();

    // Crear un objeto para almacenar los nombres de los estudiantes por campo
    const studentsByField = {};

    // Procesar cada línea del CSV
    lines.forEach((line) => {
      const [firstname, lastname, age, field] = line.split(',');

      // Ignorar líneas que no tienen todos los campos
      if (firstname && lastname && age && field) {
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstname);
      }
    });

    // Retornar el objeto con los nombres de los estudiantes por campo
    return studentsByField;

  } catch (error) {
    // Rechazar la promesa con el error si el archivo no es accesible
    throw new Error('Cannot load the database');
  }
}

export default readDatabase;
