const { src, dest, watch, series, parallel } = require('gulp');
const zip = require('gulp-zip');

const lambdaSrc = './app/src/*';
function zipTask() {
	return src(lambdaSrc)
		.pipe(zip('function.zip'))
		.pipe(dest('./app'));
}

function watchTask() {
	watch(lambdaSrc, zipTask);
}

const defaultTask = series(
	zipTask,
	watchTask
);

exports.default = defaultTask;