import AWS from "aws-sdk";

const getUserPool = () =>
  new AWS.CognitoIdentityServiceProvider({
    region: process.env.COGNITO_USER_POOL_REGION
  });

const initiateAuthResponseHandler = result =>
  result.ChallengeName
    ? { session: result.Session }
    : { idToken: result.AuthenticationResult.IdToken };

export const initiateAuth = async (email, password) => {
  const result = await getUserPool()
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
  return initiateAuthResponseHandler(result);
};

export const resetTemporaryPassword = (email, password, session) =>
  getUserPool()
    .adminRespondToAuthChallenge({
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      ChallengeResponses: {
        USERNAME: email,
        NEW_PASSWORD: password
      },
      Session: session
    })
    .promise();
