const { src, dest, series } = require('gulp');
require('dotenv').config();

// Dependencies
const zip			= require('gulp-zip'),
	  awspublish	= require('gulp-awspublish'),
	  AWS			= require('aws-sdk');

// Paths
const distSrc		= 'dist/src/**/*',
	  appSrc		= 'app/src/**/*',
	  zipSrc		= 'app/function.zip',
	  appPath		= 'app/',
	  zipFn			= 'function.zip';

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


// Tasks

// Static files

function publishDist() {
	return src(distSrc)
		.pipe(publisher.publish())
		.pipe(awspublish.reporter());
}

// Lambda function

function zipFunction() {
	return src(appSrc)
		.pipe(zip(zipFn))
		.pipe(dest(appPath));
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
		else	 console.log('version ' + data.Version);
	});
	cb();
}

const lambdaSeries = series(
	zipFunction,
	publishFunction,
	deployFunction
);


// Exports
module.exports = {
	publishDist,
	lambdaSeries
}