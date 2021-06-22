const { src, dest, parallel } = require('gulp');

// Plugins
const sourcemaps	= require('gulp-sourcemaps'),
	  include		= require('gulp-include'),
	  terser		= require('gulp-terser'),
	  concatcss		= require('gulp-concat-css'),
	  postcss		= require('gulp-postcss'),
	  autoprefixer	= require('autoprefixer'),
	  cssnano		= require('cssnano'),
	  htmlmin		= require('gulp-htmlmin');


// Tasks

function js() {
	const path = process.env.NODE_ENV === 'production'
		? 'build/zip'
		: 'build';

	return src(path + '/script.js')
		.pipe(terser())
		.pipe(dest(path));
};

function css() {
	const plugins = [
		autoprefixer(),
		cssnano()
	];
	return src('src/css/**/*.css')
		.pipe(concatcss('index.css'))
		.pipe(sourcemaps.init())
		.pipe(postcss(plugins))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('build'));
};

function html() {
	const inOptions = {
		includePaths: 'assets'
	};
	const minOptions = {
		collapseWhitespace: true,
		removeComments: true
	};

	return src('src/**/*.html')
		.pipe(include(inOptions))
		.pipe(htmlmin(minOptions))
		.pipe(dest('build'));
};

const build = parallel(js, css, html);


// Exports
module.exports = { build };