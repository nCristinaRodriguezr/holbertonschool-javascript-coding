#!/usr/bin/node
const request = require('request');
const id = process.argv[2];

if (!id) {
    console.error('Por favor, proporciona un id como primer argumento.');
    process.exit(1);
  }

const apiUrl = `https://swapi-api.hbtn.io/api/films/${id}`;

request(apiUrl, (error, response, body) => {
    if (error) {
        console.error('Error al realizar la solicitud:', error);
    } else {
        const movieData = JSON.parse(body);
        if (movieData.title) {
            console.log(movieData.title);
        } else {
            console.log('No se encontró una película con el ID proporcionado.');
        }
    }
});