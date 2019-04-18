import HttpStatus from "http-status-codes";
import { RecaptchaV3 } from "express-recaptcha";

const recaptcha = new RecaptchaV3(
  process.env.DSC_RECAPTCHA_KEY,
  process.env.DSC_RECAPTCHA_SECRET,
  {
    callback: "cb"
  }
);

export const verify = name => (req, res, next) =>
  recaptcha.verify(req, (err, data) => {
    if (err) {
      return next(err);
    }

    if (!data || data.action !== name) {
      return next({
        statusCode: HttpStatus.FORBIDDEN
      });
    }

    if (data.hostname === "localhost") {
      return next();
    }

    if (data.score <= 0.5) {
      return next({
        statusCode: HttpStatus.FORBIDDEN
      });
    }

    next();
  });
