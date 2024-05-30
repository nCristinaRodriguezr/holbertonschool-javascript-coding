#!/usr/bin/node
const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.error('Usage: ./script.js <URL> <file_path>');
  process.exit(1);
}

request(url, (error, response, body) => {
  if (error) {
    console.error('Error making the request:', error);
    return;
  }
  fs.writeFile(filePath, body, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    }
  });
});
