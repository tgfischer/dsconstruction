import dynamoose from "dynamoose";
import startCase from "lodash/startCase";

const schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: {
    type: String
  }
});

export default dynamoose.model(
  `DSCServices${startCase(process.env.SERVERLESS_STAGE)}`,
  schema
);
