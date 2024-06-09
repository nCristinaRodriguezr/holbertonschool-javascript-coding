const readline = require('readline');

// Crear una interfaz readline para la entrada y salida del proceso
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Mostrar el mensaje de bienvenida
console.log('Welcome to Holberton School, what is your name?\n');

// Leer la entrada del usuario
rl.on('line', (input) => {
  // Mostrar el nombre del usuario
  console.log(`Your name is: ${input}\r`);
  
  // Cerrar la interfaz readline
  rl.close();
});

// Evento que se ejecuta cuando la interfaz readline se cierra
rl.on('close', () => {
  console.log('This important software is now closing\r');
  process.exit(0);
});
