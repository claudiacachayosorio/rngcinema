const { src, dest, watch, series } = require('gulp');

// Dependencies
const zip			= require('gulp-zip')
	  rename		= require('gulp-rename')
	  awspublish	= require('gulp-awspublish');

// Paths
const distSrc	= './dist/**/*'
	  appSrc	= './app/src/**/*'
	  zipFile	= './app/function.zip';

// S3 publisher
const s3options = {
	params: {
		Bucket: 'rngcinema'
	}
};
const publisher = awspublish.create(s3options);

function publishDist() {
	return src(distSrc)
		.pipe(rename(path => path.dirname = '/src/' + path.dirname))
		.pipe(publisher.publish())
		.pipe(awspublish.reporter());
}

function zipFunction() {
	return src(appSrc)
		.pipe(zip('function.zip'))
		.pipe(dest('./app'));
}

function publishFunction() {
	return src(zipFile)
		.pipe(publisher.publish())
		.pipe(awspublish.reporter());
}

const lambdaSeries = series(zipFunction, publishFunction);

function watchTask() {
	watch(distSrc, publishDist);
	watch(appSrc, lambdaSeries);
}

const defaultTask = series(
	publishDist,
	lambdaSeries,
	//watchTask
);

exports.default = defaultTask;