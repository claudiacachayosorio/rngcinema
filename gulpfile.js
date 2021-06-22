const { src, series, watch } = require('gulp');

// Tasks
const { build }				= require('./gulp/build');
const { tempFiles }			= require('./gulp/dev');
const { copyApp, publish }	= require('./gulp/prod');

// Plugins
const clean = require('gulp-clean');


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


// Workers

function cleaner() {
	const options = {
		read: false,
		ignore: 'build/favicon.*'
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


// Workflows

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

const deploy = process.env.NODE_ENV === 'production' ? prod : dev;

const live = series(
	deploy,
	watcher
);


// Exports
exports.default	= deploy;
exports.dev		= dev;
exports.prod	= prod;
exports.live	= live;