import { Logger } from "@nestjs/common";
import { S3 } from "aws-sdk";
class UploadService {
  async upload(buffer, originalname) {
    console.log(process.env.AWS_ACCESS_KEY_ID, "process.env.AWS_ACCESS_KEY_ID");
    const bucketS3 = process.env.AWS_S3_BUCKET;
    return await this.uploadS3(buffer, bucketS3, originalname);
  }

  async uploadPdf(originalname, buffer) {
    const bucketS3 = process.env.AWS_S3_BUCKET;
    return await this.uploadPdfS3(bucketS3, originalname, buffer);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
  async uploadPdfS3(bucket, objectName, file) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: objectName,
      Body: file,
    };
    return await s3.putObject(params).promise();
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  async getS3Data(privateUrl) {
    const bucketS3 = process.env.AWS_S3_BUCKET;
    const s3 = this.getS3();
    const params = {
      Bucket: bucketS3,
      Key: privateUrl.replace("https://abdulbasit7886.s3.amazonaws.com/", ""),
    };

    return new Promise((resolve, reject) => {
      s3.getSignedUrl("getObject", params, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  }
  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY_ID,
    });
  }
}

export const uploadService = new UploadService();
