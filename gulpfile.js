const { src, dest, series, parallel } = require('gulp');
require('dotenv').config();

// Dependencies
const zip			= require('gulp-zip'),
	  awspublish	= require('gulp-awspublish'),
	  AWS			= require('aws-sdk'),
	  fs			= require('fs');

// Paths
const distSrc		= 'dist/**/*',
	  appSrc		= 'app/src/**/*',
	  scriptSrc		= 'app/src/script.js',
	  zipSrc		= 'app/function.zip',
	  testPath		= 'test/',
	  scriptPath	= 'test/script.js',
	  zipFn			= 'function.zip';


// Development Tasks

const theme = {
	"video":  "p9wE8dyzEJE",
	"title":  [ "A Quiet Place" ],
	"actors": [ "Emily Blunt", "John Krasinski" ],
	"colors": [ "#4e5f52", "#a99375", "#181f21", "#a7585c" ]
}
const themeStr = `const theme = ${JSON.stringify(theme)}`;

function copyDist() {
	return src(distSrc)
		.pipe(dest(testPath));
}

function generateTestJS(cb) {
	const script = fs.readFileSync(scriptSrc).toString();
	const data = themeStr + script;
	fs.writeFileSync(scriptPath, data);
	cb();
}

const test = parallel(
	copyDist,
	generateTestJS
)


// Production Tasks

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
		else	 console.log('version ' + data.Version);
	});
	cb();
}

const lambdaSeries = series(
	zipFunction,
	publishFunction,
	deployFunction
);

const deploy = series(
	publishDist,
	lambdaSeries,
);


// Default Tasks

const defaultTask = process.env.NODE_ENV === "production"
	? deploy
	: test;

exports.default = defaultTask;