const data	= require('data.json');
const AWS	= require('aws-sdk');

const s3 = new AWS.S3();

function getTheme() {
	const i = Math.floor(Math.random() * data.length);
	return data[i];
}

function generateCSSBody(theme) {
	const cssKeys = [ 'main', 'h1', 'footer', 'link' ];
	let cssStr = '';

	for (let i = 0; i < cssKeys.length; i++) {
		const key = cssKeys[i];
		const value = theme.colors[i];
		cssStr += `--${key}: #${value};`;
	}
	return `:root {${cssStr}}`;
}

function generateJSBody(theme) {
	const str = JSON.stringify(theme);
	return `exports.theme = ${str}`;
}

exports.handler = async (event) => {

	const bucket = "rngcinema";
	const cssKey = "css/theme.css";
	const jsKey = "js/theme.js";

	const theme = getTheme();
	const cssBody = generateCSSBody(theme);
	const jsBody = generateJSBody(theme);

	try {
		const cssParams = {
			Bucket: bucket,
			Key: cssKey,
			Body: cssBody,
			ContentType: "text/css"
		}
		const putCSS = await s3.putObject(cssParams).promise();
	} catch(err) {
		console.log(err);
		return;
	}

	try {
		const jsParams = {
			Bucket: bucket,
			Key: jsKey,
			Body: jsBody,
			ContentType: "text/javascript"
		}
		const putJS = await s3.putObject(jsParams).promise();
	} catch(err) {
		console.log(err);
		return;
	}

	console.log(`${cssKey} and ${jsKey} updated to theme ${theme.title.join(' ')}`);

}