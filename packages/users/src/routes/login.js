import express from "express";
import HttpStatus from "http-status-codes";
import asyncHandler from "express-async-handler";
import validate, { types } from "../schemas/validate";

import * as client from "../client";
import * as schemas from "../schemas/login";

const router = express.Router({ mergeParams: true });

const login = async (req, res) => {
  const { email, password } = res.locals.body;
  const result = await client.initiateAuth(email, password);
  res.status(HttpStatus.OK).json(result);
};

router.post(
  "/",
  validate(schemas.loginSchema, types.BODY),
  asyncHandler(login)
);

export default router;
