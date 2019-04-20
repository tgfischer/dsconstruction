import express from "express";
import asyncHandler from "express-async-handler";
import HttpStatus from "http-status-codes";
import { validate } from "@tomfischer/middleware";
import { RecaptchaV2 } from "express-recaptcha";

import * as settings from "../clients/settings";
import * as contact from "../clients/contact";
import * as schemas from "../schemas/contact";

const router = express.Router({ mergeParams: true });

const recaptcha = new RecaptchaV2(
  process.env.DSC_RECAPTCHA_KEY,
  process.env.DSC_RECAPTCHA_SECRET
);

const get = async (req, res) => {
  const contact = await settings.get("contact");
  return res.status(HttpStatus.OK).json({ contact });
};

const sendEmail = async (req, res, next) => {
  if (req.recaptcha.error) {
    return next({
      statusCode: HttpStatus.FORBIDDEN,
      message: "You are not allowed to do that"
    });
  }

  await contact.sendEmail(res.locals.body);
  return res.status(HttpStatus.OK).json({ success: true });
};

const update = async (req, res) => {
  await settings.update("contact", res.locals.body);
  return res.status(HttpStatus.OK).json({ success: true });
};

router.get("/", asyncHandler(get));

router.post(
  "/",
  validate(schemas.sendEmail, "body"),
  recaptcha.middleware.verify,
  asyncHandler(sendEmail)
);

router.post("/edit", validate(schemas.update, "body"), asyncHandler(update));

export default router;
