const Data = require('./movies.json');

function getMovie() {
	const i = Math.floor(Math.random() * Data.length);
	return Data[i];
}
const movie = getMovie();
const movieStr = JSON.stringify(movie);

function generateCSSBody() {
	const cssVarNames = [ 'main', 'footer', 'h1', 'link' ];
	let cssVarStr = '';

	for (i = 0; i < cssVarNames.length; i++) {
		const key = cssVarNames[i];
		const value = movie.colors[i];
		cssVarStr += `--${key}: #${value};`;
	}
	return `:root {${cssVarStr}}`;
}

function generateJSBody() {
	return `exports.movie = ${movieStr};`;
}