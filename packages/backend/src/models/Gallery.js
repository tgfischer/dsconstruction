import dynamoose from "dynamoose";
import startCase from "lodash/startCase";

const schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  original: {
    type: String
  },
  thumbnail: {
    type: String
  },
  tags: {
    type: Array
  },
  createdAt: {
    type: Date
  }
});

export default dynamoose.model(
  `DSCGallery${startCase(process.env.SERVERLESS_STAGE)}`,
  schema
);
