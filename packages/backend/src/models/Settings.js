import dynamoose from "dynamoose";
import startCase from "lodash/startCase";

const schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  value: {
    type: Object
  }
});

export default dynamoose.model(
  `DSCSettings${startCase(process.env.SERVERLESS_STAGE)}`,
  schema
);
