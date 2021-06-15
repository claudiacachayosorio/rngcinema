const { src, dest, series } = require('gulp');
require('dotenv').config();

// Dependencies
const AWS			= require('aws-sdk'),
	  zip			= require('gulp-zip'),
	  rename		= require('gulp-rename'),
	  awspublish	= require('gulp-awspublish');

// Paths
const distSrc	= './dist/**/*',
	  appSrc	= './app/src/**/*',
	  zipSrc	= './app/function.zip',
	  zipFn		= 'function.zip';

// Globals
const region		= process.env.AWS_REGION,
	  bucket		= process.env.AWS_S3_BUCKET,
	  functionName	= process.env.AWS_LAMBDA_NAME;

// Service objects
AWS.config.region = region;
const s3options = {
	params: {
		Bucket: bucket
	}
};
const publisher = awspublish.create(s3options);
const lambda = new AWS.Lambda();


// Tasks

// Static files
function publishDist() {
	return src(distSrc)
		.pipe(rename(path => path.dirname = '/src/' + path.dirname))
		.pipe(publisher.publish())
		.pipe(awspublish.reporter());
}

// Lambda function

function zipFunction() {
	return src(appSrc)
		.pipe(zip(zipFn))
		.pipe(dest('./app'));
}

function publishFunction() {
	return src(zipSrc)
		.pipe(publisher.publish())
		.pipe(awspublish.reporter());
}

function deployFunction(cb) {
	const params = {
		FunctionName: functionName,
		S3Bucket: bucket,
		S3Key: zipFn,
		Publish: true
	}
	lambda.updateFunctionCode(params, (err, data) => {
		if (err) console.log(err);
		else	 version = data.Version;
	});
	cb();
}

const lambdaSeries = series(
	zipFunction,
	publishFunction,
	deployFunction
);

// Default tasks
const defaultTask = series(
	publishDist,
	lambdaSeries,
);
exports.default = defaultTask;