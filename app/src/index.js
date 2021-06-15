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
exports.handler = async (event) => {

	// Settings

	const bucket	= process.env.AWS_S3_BUCKET,
		  cssKey	= process.env.AWS_S3_KEY_CSS,
		  jsKey		= process.env.AWS_S3_KEY_JS,
		  srcPath	= process.env.AWS_S3_PATH_SRC;

	const theme		= getTheme(),
		  cssBody	= generateCSSBody(theme),
		  jsBody	= generateJSBody(theme);

	const destPath	= 'dist/';


	// Static files

	let listResult;
	try {
		const srcParams = {
			Bucket: bucket,
			Prefix: srcPath
		}
		listResult = await s3.listObjectsV2(srcParams).promise();

	} catch(err) {
		console.log(err);
		return;
	}

	try {
		let promises = [];
		for (let i = 0; i < listResult.length; i++) {
			const srcObjects = listResult.Contents;
			const srcKey = srcObjects[i].Key;
			const destKey = srcKey.replace(srcPath, destPath);

			const params = {
				Bucket: bucket,
				CopySource: `${bucket}/${key}`,
				Key: destKey
			}

			const copyResult = s3.copyObject(params, (err, data) => {
				if (err) console.log(err);
				else	 console.log(data);
			});

			promises.push(copyResult);
		}
		await Promise.all(promises);

	} catch(err) {
		console.log(err);
		return;
	}


	// Dynamic files

	// Generate CSS file
	try {
		const cssParams = {
			Bucket: bucket,
			Key: destPath + cssKey,
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
			Key: destPath + jsKey,
			Body: jsBody,
			ContentType: 'text/javascript'
		}
		const putJSResult = await s3.putObject(jsParams).promise();

	} catch(err) {
		console.log(err);
		return;
	}


	// INFO
	console.log(`${cssKey} and ${jsKey} in ${bucket} updated to theme ${theme.title.join(' ')}`);

}