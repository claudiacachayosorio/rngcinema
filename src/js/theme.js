const movieStr = JSON.stringify(movie);

function generateJSBody() {
	return `exports.movie = ${movieStr};`;
}