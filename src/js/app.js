const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {

	const bucket = event.Records[0].s3.bucket.name;
	const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

	const stylesheet = `
		:root {
			--main: var(--medium-grey);
			--footer: var(--brown);
			--h1: var(--beige);
			--link: var(--beige);
		}
	`;

	try {
		const params = {
			Bucket: bucket,
			Key: key,
			Body: stylesheet,
			ContentType: "text/css"
		}
		const output = await s3.putObject(params).promise();

	} catch(err) {
		console.log(err);
		return;
	}

	console.log(`${bucket}/${key} successfully rewritten`);

}