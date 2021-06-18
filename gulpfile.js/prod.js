const { src, dest, series } = require('gulp');
const AWS = require('aws-sdk');
require('dotenv').config();

// Plugins
const zip			= require('gulp-zip'),
	  awspublish	= require('gulp-awspublish');

// AWS settings
const region		= process.env.AWS_REGION,
	  bucket		= process.env.AWS_S3_BUCKET,
	  functionName	= process.env.AWS_LAMBDA_NAME;

AWS.config.region = region;

// Service objects
const s3options = {
	params: {
		Bucket: bucket
	}
};
const publisher = awspublish.create(s3options);
const lambda = new AWS.Lambda();


// Build

function copyApp() {
	return src('src/app/**/*')
		.pipe(dest('build/zip'));
}


// Deploy

function zipFunction() {
	return src('build/zip/**/*')
		.pipe(zip('function.zip'))
		.pipe(dest('build'));
}

function publishBuild() {
	return src('build/**/*', { ignore: 'build/zip/**/*' })
		.pipe(publisher.publish())
		.pipe(awspublish.reporter());
}

function deployFunction(cb) {
	const params = {
		FunctionName: functionName,
		S3Bucket: bucket,
		S3Key: 'function.zip',
		Publish: true
	}
	lambda.updateFunctionCode(params, cb);
}

const publish = series(
	zipFunction,
	publishBuild,
	deployFunction
);


// Exports
module.exports = { copyApp, publish };