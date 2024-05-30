#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2];

if (!apiUrl) {
  console.error('Usage: ./script.js <API_URL>');
  process.exit(1);
}

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error making the request:', error);
    return;
  }

  const todos = JSON.parse(body);
  const completedTasksByUser = {};

  todos.forEach(todo => {
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
});
