const data = require('data.json');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

function getTheme() {
	const i = Math.floor(Math.random() * data.length);
	return data[i];
}

function generateCSSBody(theme) {
	const cssKeys = [ 'main', 'h1', 'footer', 'link' ];
	let cssStr = '';

	for (i = 0; i < cssKeys.length; i++) {
		const key = cssKeys[i];
		const value = theme.colors[i];
		cssStr += `--${key}: #${value};`;
	}
	return `:root {${cssStr}}`;
}

exports.handler = async (event) => {

	const bucket = event.Records[0].s3.bucket.name;
	const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

	const theme = getTheme();
	const css = generateCSSBody(theme);

	try {
		const params = {
			Bucket: bucket,
			Key: key,
			Body: css,
			ContentType: "text/css"
		}
		const output = await s3.putObject(params).promise();

	} catch(err) {
		console.log(err);
		return;
	}

	console.log(`${bucket}/${key} updated to theme ${theme.title}`);

}