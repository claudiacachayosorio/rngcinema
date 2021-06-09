// Define movie variable

const Data = require('movies.json');

function getMovie() {
	const i = Math.floor(Math.random() * Data.length);
	return Data[i];
}
const movie = getMovie();

// Use movie variable

const
	title1 = document.getElementById('title-1'),
	title2 = document.getElementById('title-2'),
	actor1 = document.getElementById('actor-1'),
	actor2 = document.getElementById('actor-2');

function setHTML() {
	title1.innerHTML = movie.title[0];
	title2.innerHTML = movie.title[1];
	actor1.innerHTML = movie.actors[0];
	actor2.innerHTML = movie.actors[1];
}

function getCSSText() {
	const $ = movie.colors;
	return `
		:root {
			--main: #${$.colors[0]};
			--footer: #${$.colors[1]};
			--h1: #${$.colors[2]};
			--link: #${$.colors[3]};
		}
	`;
}