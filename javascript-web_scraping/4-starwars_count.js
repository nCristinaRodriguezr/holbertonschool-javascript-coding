#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2];
const characterId = 18;

if (!apiUrl) {
  console.error('Por favor, proporciona la URL de la API como primer argumento.');
  process.exit(1);
}

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error al realizar la solicitud:', error);
    return;
  }

  const films = JSON.parse(body).results;
  let count = 0;

  films.forEach(film => {
    film.characters.forEach(character => {
      if (character.includes(`/api/people/${characterId}/`)) {
        count++;
      }
    });
  });

  console.log(count);
});
