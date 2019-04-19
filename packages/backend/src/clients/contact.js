import AWS from "aws-sdk";

import * as settings from "../clients/settings";

export const sendEmail = async ({ firstName, lastName, email, message }) => {
  const { email: to } = await settings.get("contact");
  AWS.config.update({ region: "us-east-1" });
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  await ses
    .sendEmail({
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: `[ds.construction] New message from ${firstName} ${lastName}`
        },
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: `New message from ${firstName} ${lastName} <${email}> on ds.construction\n\nMessage:\n\n${message}`
          }
        }
      },
      Source: process.env.DSC_CONTACT_EMAIL
    })
    .promise();
};