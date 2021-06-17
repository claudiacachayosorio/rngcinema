const { series } = require('gulp');
const { copyDist, generateJS, watchFiles } = require('./dev.js');
const { publishDist, lambdaSeries } = require('./prod.js');

const dev = series(
	copyDist,
	generateJS,
	watchFiles
);

const prod = series(
	publishDist,
	lambdaSeries
);

const build = process.env.NODE_ENV === "production"
	? prod
	: dev;

exports.default = build;
exports.dev = dev;
exports.prod = prod;