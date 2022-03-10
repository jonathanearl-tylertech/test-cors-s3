const express = require('express');
const AWS = require('aws-sdk')
require('dotenv').config()

const accessKeyId = process.env.S3_ACCESS_KEY_ID ?? 'minioadmin'
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY ?? 'minioadmin'
const endpoint = process.env.S3_ENDPOINT ?? 'http://127.0.0.1:9000'
const Bucket = process.env.S3_BUCKET ?? 'tcp-local-dev'
const region = 'us-west-2'
const Key = 'test';

const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region,
    endpoint,
    s3ForcePathStyle: true, // needed with minio?
    signatureVersion: 'v4'
})


const app = express();

app.get('/presigned', async (req,res) => {
    const url = s3.getSignedUrl('putObject', {
        Bucket,
        Key,
        Expires: 60 * 5
    })
    res.send(url);
})

app.use(express.static('static'))

app.listen(5000, () => {
    console.log("now listening at http://localhost:5000")
})