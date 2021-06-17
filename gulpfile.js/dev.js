const { src, dest, watch } = require('gulp');

// Dependencies
const header	= require('gulp-header');

// Paths
const distSrc	= 'dist/src/**/*',
	  scriptSrc	= 'app/src/script.js',
	  devPath	= 'dist/dev/';

// Dev variables
const theme = {
	"video":  "p9wE8dyzEJE",
	"title":  [ "A Quiet Place" ],
	"actors": [ "Emily Blunt", "John Krasinski" ],
	"colors": [ "#4e5f52", "#a99375", "#181f21", "#a7585c" ]
}


// Tasks

function copyDist() {
	return src(distSrc)
		.pipe(dest(devPath));
}

function generateJS() {
	const text = `const theme = ${JSON.stringify(theme)}`;
	return src(scriptSrc)
		.pipe(header(text))
		.pipe(dest(devPath));
}

function watchFiles(cb) {
	watch(distSrc, copyDist);
	watch(scriptSrc, generateJS);
	cb();
}


// Exports
module.exports = {
	copyDist,
	generateJS,
	watchFiles
};