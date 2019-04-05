import AWS from "aws-sdk";

const getS3Bucket = () => new AWS.S3();

export const getSignedUrl = files =>
  files.map(file => ({
    url: getS3Bucket().getSignedUrl("putObject", {
      Bucket: process.env.DSC_BUCKET_NAME,
      Key: file,
      Expires: 60 * 5,
      ACL: "public-read"
    }),
    file
  }));
