const { src, dest, series, parallel, watch } = require('gulp');
const { tempFiles } = require('./dev');
const { copyApp, publish } = require('./prod');

// Plugins
const sourcemaps	= require('gulp-sourcemaps'),
	  clean			= require('gulp-clean'),
	  terser		= require('gulp-terser'),
	  concatcss		= require('gulp-concat-css'),
	  postcss		= require('gulp-postcss'),
	  autoprefixer	= require('autoprefixer'),
	  cssnano		= require('cssnano'),
	  htmlmin		= require('gulp-htmlmin');


// Environment

function setDev(cb) {
	process.env.NODE_ENV = 'development';
	console.log('currently in ' + process.env.NODE_ENV);
	cb();
}

function setProd(cb) {
	process.env.NODE_ENV = 'production';
	console.log('currently in ' + process.env.NODE_ENV);
	cb();
}


// Build

function js() {
	const path = process.env.NODE_ENV === 'production'
		? 'build/zip'
		: 'build';

	return src(path + '/script.js')
		.pipe(terser())
		.pipe(dest(path));
}

function css() {
	const plugins = [
		autoprefixer(),
		cssnano()
	];

	return src('src/dist/css/**/*.css')
		.pipe(concatcss('index.css'))
		.pipe(sourcemaps.init())
		.pipe(postcss(plugins))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('build'));
}

function html() {
	return src('src/dist/html/**/*.html')
		.pipe(htmlmin())
		.pipe(dest('build'));
}

const build = parallel(js, css, html);


// Tasks

function cleaner() {
	return src('build/**/*', { read: false })
		.pipe(clean());
}

function watcher(cb) {
	const paths = [ 'src/dist/**/*', 'src/app/script.js' ];
	watch(paths, build);
	cb();
}


// Exports

const dev = series(
	setDev,
	tempFiles,
	build,
	watcher
);

const prod = series(
	setProd,
	cleaner,
	copyApp,
	build,
	publish
);

const deploy = process.env.NODE_ENV === 'production' ? prod : dev;

exports.default = deploy;
exports.dev = dev;
exports.prod = prod;