const { src, dest, parallel } = require('gulp');
const fs = require('fs');

// Plugins
const header = require('gulp-header');

// Placeholder theme
const theme = {
	"video":  "p9wE8dyzEJE",
	"title":  [ "A Quiet Place" ],
	"actors": [ "Emily Blunt", "John Krasinski" ],
	"colors": [ "#4e5f52", "#a99375", "#181f21", "#a7585c" ]
};
const themeStr = JSON.stringify(theme);

const $ = theme.colors;
const css = `:root{
	--main:${$[0]};
	--h1:${$[1]};
	--footer:${$[2]};
	--link:${$[3]};
}`;


// Tasks

function tempJS() {
	const text = `var theme = ${themeStr};`;
	return src('src/app/script.js')
		.pipe(header(text))
		.pipe(dest('build'));
};

function tempCSS(cb) {
	fs.writeFile('build/theme.css', css, cb);
};

const tempFiles = parallel(tempJS, tempCSS);


// Exports
module.exports = { tempFiles };