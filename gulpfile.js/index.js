const { src, dest, series, parallel, watch } = require('gulp');
const { tempFiles } = require('./dev');
const { copyApp, publish } = require('./prod');

// Plugins
const sourcemaps	= require('gulp-sourcemaps'),
	  clean			= require('gulp-clean'),
	  include		= require('gulp-include'),
	  terser		= require('gulp-terser'),
	  concatcss		= require('gulp-concat-css'),
	  postcss		= require('gulp-postcss'),
	  autoprefixer	= require('autoprefixer'),
	  cssnano		= require('cssnano'),
	  htmlmin		= require('gulp-htmlmin');


// Environment

function setDEV(cb) {
	process.env.NODE_ENV = 'development';
	console.log('currently in ' + process.env.NODE_ENV);
	cb();
};

function setPROD(cb) {
	process.env.NODE_ENV = 'production';
	console.log('currently in ' + process.env.NODE_ENV);
	cb();
};


// Build

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


// Workers

function cleaner() {
	const options = {
		read: false,
		ignore: 'build/favicon.ico'
	};
	return src('build/**/*', options)
		.pipe(clean());
};

function watcher(cb) {
	const paths = [
		'src/dist/**/*',
		'src/app/script.js'
	];
	watch(paths, build);
	cb();
};


// Exports

const dev = series(
	setDEV,
	tempFiles,
	build,
);

const prod = series(
	setPROD,
	cleaner,
	copyApp,
	build,
	publish
);

const live = series(
	dev,
	watcher
);

const deploy = process.env.NODE_ENV === 'production' ? prod : dev;

// Testing Gulp tasks
const test = html;

exports.default	= deploy;
exports.dev		= dev;
exports.prod	= prod;
exports.live	= live;
exports.test	= test || deploy;