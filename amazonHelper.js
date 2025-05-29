const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
// const client = new AWS.S3({ region: "eu-central-1"});


const AWS_ACCESS_KEY_ID= ""
const AWS_SECRET_ACCESS_KEY=""

const client = new S3Client({
    region: "eu-central-1",
    credentials: {
        accessKeyId:     AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        // sessionToken:    process.env.AWS_SESSION_TOKEN,  // if you have one
    }
});

async function AWS_obje_alma (key){
    var cevap = await client.send(new GetObjectCommand({
        Bucket: "kovva1",
        Key:    key,
        // Body:   "Hello!"
    }));

    return cevap;
}

module.exports = {AWS_obje_alma};
