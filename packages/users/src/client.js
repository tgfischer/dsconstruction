import AWS from "aws-sdk";

const getUserPool = () =>
  new AWS.CognitoIdentityServiceProvider({
    region: process.env.COGNITO_USER_POOL_REGION
  });

const initiateAuthResponseHandler = result => {
  if (!result.ChallengeName) {
    return { idToken: result.AuthenticationResult.IdToken };
  }
  const { name: firstName, family_name: lastName, email } = JSON.parse(
    result.ChallengeParameters.userAttributes
  );
  return {
    session: result.Session,
    challengeName: result.ChallengeName,
    user: {
      firstName,
      lastName,
      email
    }
  };
};

export const initiateAuth = async (email, password) => {
  const response = await getUserPool()
    .adminInitiateAuth({
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    })
    .promise();

  const result = initiateAuthResponseHandler(response);
  if (result.session) {
    return result;
  }
  const user = await getUser(email);
  return { ...result, user };
};

export const resetTemporaryPassword = async (
  email,
  password,
  firstName,
  lastName,
  session
) => {
  const response = await getUserPool()
    .adminRespondToAuthChallenge({
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      ChallengeResponses: {
        USERNAME: email,
        NEW_PASSWORD: password,
        "userAttributes.name": firstName,
        "userAttributes.family_name": lastName
      },
      Session: session
    })
    .promise();

  const result = initiateAuthResponseHandler(response);
  const user = await getUser(email);
  return { ...result, user };
};

export const getUser = async username => {
  const result = await getUserPool()
    .adminGetUser({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username
    })
    .promise();

  const mapping = {
    name: "firstName",
    family_name: "lastName",
    email: "email"
  };

  return result.UserAttributes.reduce(
    (user, { Name, Value }) =>
      mapping[Name]
        ? {
            ...user,
            [mapping[Name]]: Value
          }
        : user,
    {}
  );
};

export const createUser = async (firstName, lastName, email, password) => {
  const result = await getUserPool()
    .adminCreateUser({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: email,
      TemporaryPassword: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email
        },
        {
          Name: "name",
          Value: firstName
        },
        {
          Name: "family_name",
          Value: lastName
        }
      ]
    })
    .promise();

  return result.UserAttributes;
};
