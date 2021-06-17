const AWS	= require('aws-sdk');
const fs	= require('fs');
const data	= require('data.json');
const s3	= new AWS.S3();

// Theme

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
		colors += `--${key}:${value};`;
	}
	return colors;
}

// Inject custom properties into root level CSS declaration
function generateCSSBody(theme) {
	const colorVars = getThemeColors(theme);
	return `:root{${colorVars}}`;
}

// Concatenate theme object and script.js to one string
function generateJSBody(theme) {
	const themeStr = `const theme = ${JSON.stringify(theme)}`;
	const fileStr = fs.readFileSync('./script.js').toString();
	return themeStr + fileStr;
}

// Handler

exports.handler = async () => {

	// Settings

	const bucket	= process.env.AWS_S3_BUCKET,
		  cssKey	= 'css/theme.css',
		  jsKey		= 'script.js';

	const theme		= getTheme(),
		  cssBody	= generateCSSBody(theme),
		  jsBody	= generateJSBody(theme);


	// Generate CSS file
	try {
		const cssParams = {
			Bucket: bucket,
			Key: cssKey,
			Body: cssBody,
			ContentType: 'text/css'
		}
		const putCSSResult = await s3.putObject(cssParams).promise();

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
			ContentType: 'text/javascript'
		}
		const putJSResult = await s3.putObject(jsParams).promise();

	} catch(err) {
		console.log(err);
		return;
	}


	// Info logs
	console.log(`${cssKey} and ${jsKey} now showing ${theme.title.join(' ')}`);

}