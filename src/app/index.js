const AWS	= require('aws-sdk');
const fs	= require('fs');
const data	= require('data.json');
const s3	= new AWS.S3();

// Random selection of theme object
function getTheme() {
	const i = Math.floor(Math.random() * data.length);
	const theme = data[i];
	// add hash to hex values
	theme.colors.forEach((hex, i) => theme.colors[i] = `#${hex}`);
	return theme;
}

// Create string of CSS custom properties at root level
function generateCSSBody(theme) {
	const cssVars = [ 'main', 'h1', 'footer', 'link' ];
	let cssStr = '';
	for (let i = 0; i < cssVars.length; i++) {
		const key = cssVars[i];
		const value = theme.colors[i];
		cssStr += `--${key}: ${value};`;
	}
	return `:root {${cssStr}}`;
}

// Concatenate theme object and script.js as one string
function generateJSBody(theme) {
	const themeStr = `const theme = ${JSON.stringify(theme)}`;
	const fileStr = fs.readFileSync('./script.js').toString();
	return themeStr + fileStr;
}

exports.handler = async (event) => {

	const bucket	= event.path.bucket;
	const cssKey	= event.path.keys.css;
	const jsKey		= event.path.keys.js;

	const theme		= getTheme();
	const cssBody	= generateCSSBody(theme);
	const jsBody	= generateJSBody(theme);

	// Generate CSS file
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

	// Generate JS file
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

	console.log(`${cssKey} and ${jsKey} in ${bucket} updated to theme ${theme.title.join(' ')}`);

}