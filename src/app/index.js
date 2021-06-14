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

// Generate string of CSS variables for colors
function getThemeColors(theme) {
	const varNames = [ 'main', 'h1', 'footer', 'link' ];
	let colors = '';
	for (let i = 0; i < varNames.length; i++) {
		const key = varNames[i];
		const value = theme.colors[i];
		colors += `--${key}: ${value};`;
	}
	return colors;
}

// Inject custom properties into root level CSS declaration
function generateCSSBody(theme) {
	const colorVars = getThemeColors(theme);
	return `:root {${colorVars}}`;
}

// Concatenate theme object and script.js to one string
function generateJSBody(theme) {
	const themeStr = `const theme = ${JSON.stringify(theme)}`;
	const fileStr = fs.readFileSync('./script.js').toString();
	return themeStr + fileStr;
}

exports.handler = async (event) => {

	const bucket	= "rngcinema";
	const cssKey	= "css/theme.css";
	const jsKey		= "script.js";

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