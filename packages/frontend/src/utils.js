export const getPhotoUrl = key =>
  `https://${process.env.REACT_APP_PHOTO_BUCKET_NAME}.s3.amazonaws.com${key}`;
