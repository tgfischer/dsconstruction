export const getPhotoUrl = key =>
  `https://s3.ca-central-1.amazonaws.com/${process.env.REACT_APP_PHOTO_BUCKET_NAME}${key}.jpeg`;
