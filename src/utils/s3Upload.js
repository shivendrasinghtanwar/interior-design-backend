const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');
const { s3Config } = require('../../config/config');

class S3upload {
  constructor() {
    AWS.config.update({
      secretAccessKey: s3Config.awsSecreatKey,
      accessKeyId: s3Config.awsAccessId
    });
  }

  async s3Upload(filePath, awsDir) {
    const file = fs.readFileSync(filePath);
    const s3Params = {
      Bucket: s3Config.bucket,
      Key: awsDir,
      Body: file,
      ACL: 'private'
    };
    const s3 = new AWS.S3();
    const s3Response = await s3.upload(s3Params).promise();
    return s3Response.Location;
  }

  async downloadAndUploadToS3(url, awsDir) {
    const file = await axios.get(url, {
      responseType: 'stream'
    });
    const s3Params = {
      Bucket: s3Config.bucket,
      Key: awsDir,
      Body: file.data,
      ACL: 'private'
    };
    const s3 = new AWS.S3();
    const s3Response = await s3.upload(s3Params).promise();
    return s3Response.Location;
  }

  async s3Download(awsDir) {
    const s3Params = {
      Bucket: s3Config.bucket,
      Key: awsDir
    };
    const s3 = new AWS.S3();
    const data = await s3.getObject(s3Params).promise();
    return data;
  }
}
module.exports = new S3upload();
