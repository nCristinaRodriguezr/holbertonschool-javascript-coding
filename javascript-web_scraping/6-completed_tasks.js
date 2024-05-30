#!/usr/bin/node
const https = require('https'); // Cambio: Usar el módulo 'https' en lugar de 'request'

const apiUrl = process.argv[2];

if (!apiUrl) {
  console.error('Usage: ./script.js <API_URL>');
  process.exit(1);
}

https.get(apiUrl, (res) => { // Cambio: Usar https.get en lugar de request
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const todos = JSON.parse(data);
      const completedTasksByUser = {};

      todos.forEach((todo) => {
        if (todo.completed) {
          if (!completedTasksByUser[todo.userId]) {
            completedTasksByUser[todo.userId] = 0;
          }
          completedTasksByUser[todo.userId]++;
        }
      });

      // Convert completedTasksByUser to a JSON string
      const jsonString = JSON.stringify(completedTasksByUser, null, 2);

      // Replace double quotes with single quotes
      const jsonStringWithSingleQuotes = jsonString.replace(/"(\d+)":/g, "'$1':");

      console.log(jsonStringWithSingleQuotes);
    } catch (error) {
      console.error('Error parsing response:', error.message);
    }
  });
}).on('error', (err) => {
  console.error('Error making the request:', err.message);
});
